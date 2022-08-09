package govm

import (
	"github.com/joshuaseligman/GoVM-Web/server/internal/util"
	"github.com/joshuaseligman/GoVM/pkg/hardware/clock"
	"github.com/joshuaseligman/GoVM/pkg/hardware/cpu"
	"github.com/joshuaseligman/GoVM/pkg/hardware/memory"
)

// The struct that will handle the programs and their execution
type GoVMManager struct {
	pendingQueue   *util.Queue    // The queue for pending programs
	inProgress     *util.Program  // The program in progress
	completedQueue *util.Queue    // The queue of completed programs
	memory         *memory.Memory // The memory for the computer
	cpu            *cpu.Cpu       // The CPU for the computer
	clk            *clock.Clock   // The clock for the computer
	running        bool           // Variable for if it is running
}

var (
	inProgressChan chan *util.Program = make(chan *util.Program, 2) // Channel to communicate the updates program in progress
	completedChan  chan *util.Program = make(chan *util.Program, 1) // Channel to buffer the program to be added to the completed queue when it is done running
	statusChan     chan []any         = make(chan []any)            // Channel to get most up-to-date information
)

// Function that creates a new GoVM Manager
func NewGoVMManager() *GoVMManager {
	govmManager := GoVMManager {
		pendingQueue:   util.NewQueue(),
		inProgress:     nil,
		completedQueue: util.NewQueue(),
		memory:         memory.NewEmptyMemory(0x10000),
		clk:            clock.NewClock(),
		running:        false,
	}
	govmManager.cpu = cpu.NewCpu(govmManager.memory, govmManager.clk)
	govmManager.clk.AddClockListener(govmManager.cpu)
	go govmManager.Start()
	return &govmManager
}

// Function that starts the manager on the server
func (govmManager GoVMManager) Start() {
	for {
		if !govmManager.running {
			if newProg := govmManager.pendingQueue.Dequeue(); newProg != nil {
				govmManager.running = true
				inProgressChan <- newProg
				completedChan <- newProg
				govmManager.memory.FlashProgram(newProg.Prog)
				govmManager.clk.StartClockAPI(1000, statusChan)
			}
		} else if govmManager.clk.IsStopped() {
			inProgressChan <- nil
			govmManager.cpu.ResetCpu()
			govmManager.memory.ResetMemory()
			govmManager.completedQueue.EnqueueProg(<-completedChan)
			govmManager.running = false
		}
	}
}

// Adds a program to the queue
func (govmManager *GoVMManager) AddProgram(newProg *util.RunStruct) {
	govmManager.pendingQueue.Enqueue(newProg)
}

// Gets the struct for the program status
func (govmManager *GoVMManager) GetQueues() *util.QueueStruct {
	if len(inProgressChan) == 2 {
		<-inProgressChan
		govmManager.inProgress = <-inProgressChan
	} else if len(inProgressChan) == 1 {
		govmManager.inProgress = <-inProgressChan
	}
	return &util.QueueStruct{
		Pending:    govmManager.pendingQueue.ToArray(),
		InProgress: govmManager.inProgress,
		Completed:  govmManager.completedQueue.ToArray(),
	}
}

// Gets the API-compatible struct for the status
func (govmManager *GoVMManager) GetStatus() *util.CpuStatusStruct {
	defer func() {
		if err := recover(); err != nil {
			return
		}
	}()

	if govmManager.inProgress != nil {
		data := <-statusChan
		if data[0] == nil {
			return &util.CpuStatusStruct{
				Cpu: &cpu.CpuAPI{},
			}
		}
		
		var cpuStatus *cpu.CpuAPI = data[0].(*cpu.CpuAPI)
		
		return &util.CpuStatusStruct {
			Cpu: cpuStatus,
		}
	} else {
		return &util.CpuStatusStruct {
			Cpu: nil,
		}
	}
}
		
