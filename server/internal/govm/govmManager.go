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
	finalStatusChan chan *util.FinalStatusStruct = make(chan *util.FinalStatusStruct, 1) // The channel to buffer the final status information
	finalStatuses []*util.FinalStatusStruct = make([]*util.FinalStatusStruct, 0) // Array to keep track of the final statuses
)

// Function that creates a new GoVM Manager
func NewGoVMManager() *GoVMManager {
	govmManager := GoVMManager {
		pendingQueue:   util.NewQueue(),
		inProgress:     nil,
		completedQueue: util.NewQueue(),
		clk:            clock.NewClock(),
		running:        false,
	}
	govmManager.memory = memory.NewEmptyMemory(0x10000, govmManager.clk)
	govmManager.cpu = cpu.NewCpu(govmManager.memory, govmManager.clk)
	govmManager.clk.AddClockListener(govmManager.cpu)
	go govmManager.Start()
	return &govmManager
}

// Function that starts the manager on the server
func (govmManager GoVMManager) Start() {
	for {
		if !govmManager.running {
			// Get the next program
			if newProg := govmManager.pendingQueue.Dequeue(); newProg != nil {
				// Update the channels
				govmManager.running = true
				inProgressChan <- newProg
				completedChan <- newProg
				// Add the program to RAM and start the execution
				govmManager.memory.FlashProgram(newProg.Prog)
				govmManager.clk.StartClockAPI(1000, statusChan)
			}
		} else if govmManager.clk.IsStopped() {
			inProgressChan <- nil
			// Get the final snapshot
			status := govmManager.cpu.ConvertAPI()
			// Reset everything
			govmManager.cpu.ResetCpu()
			govmManager.memory.ResetMemory()
			prog := <-completedChan
			// Add the program to the completed queue and save the final state
			govmManager.completedQueue.EnqueueProg(prog)
			finalStatusChan <- &util.FinalStatusStruct{
				Program: prog,
				FinalCpu: status,
			}
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
	// Update final statuses
	if len(finalStatusChan) == 1 {
		finalStatuses = append(finalStatuses, <-finalStatusChan)
	}

	// Update in progress if needed 
	if len(inProgressChan) == 2 {
		<-inProgressChan
		govmManager.inProgress = <-inProgressChan
	} else if len(inProgressChan) == 1 {
		govmManager.inProgress = <-inProgressChan
	}
	// Return the queues
	return &util.QueueStruct{
		Pending:    govmManager.pendingQueue.ToArray(),
		InProgress: govmManager.inProgress,
		Completed:  govmManager.completedQueue.ToArray(),
	}
}

// Gets the API-compatible struct for the status
func (govmManager *GoVMManager) GetStatus() *util.CpuStatusStruct {
	// Function in case there is a failure
	defer func() {
		if err := recover(); err != nil {
			return
		}
	}()

	// If a program is running
	if govmManager.inProgress != nil {
		// Get the latest status
		data := <-statusChan
		if data[0] == nil {
			return &util.CpuStatusStruct{
				Cpu: &cpu.CpuAPI{},
			}
		}
		
		// Convert the type and return it
		var cpuStatus *cpu.CpuAPI = data[0].(*cpu.CpuAPI)
		
		return &util.CpuStatusStruct {
			Cpu: cpuStatus,
		}
	} else {
		// Otherwise return nil
		return &util.CpuStatusStruct {
			Cpu: nil,
		}
	}
}

// Function that gets the final status of the program with the matching id
func GetFinalStatus(id int) *util.FinalStatusStruct {
	// Search for the id and return the status
	for i := 0; i < len(finalStatuses); i++ {
		if int32(id) == finalStatuses[i].Program.Id {
			return finalStatuses[i]
		}
	}
	return nil
}