package govm

import (
	"time"

	"github.com/joshuaseligman/GoVM-Web/server/internal/util"
	"github.com/joshuaseligman/GoVM/pkg/hardware/memory"
)

// The struct that will handle the programs and their execution
type GoVMManager struct {
	pendingQueue *util.Queue // The queue for pending programs
	inProgress *util.Program // The program in progress
	completedQueue *util.Queue // The queue of completed programs
	memory *memory.Memory // The memory for the computer
	running bool // Variable for if it is running
}

var (
	inProgressChan chan *util.Program = make(chan *util.Program, 2) // Channel to communicate the updates program in progress
)
// Function that creates a new GoVM Manager
func NewGoVMManager() *GoVMManager {
	govmManager := GoVMManager {
		pendingQueue: util.NewQueue(),
		inProgress: nil,
		completedQueue: util.NewQueue(),
		memory: memory.NewEmptyMemory(0x10000),
		running: false,
	}
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
				govmManager.memory.FlashProgram(newProg.Prog)
				time.Sleep(5 * time.Second)
				inProgressChan <- nil
				govmManager.completedQueue.EnqueueProg(newProg)
				govmManager.running = false
			}
		}
	}
}

// Adds a program to the queue
func (govmManager *GoVMManager) AddProgram(newProg *util.RunStruct) {
	govmManager.pendingQueue.Enqueue(newProg)
}

// Gets the struct for the program status
func (govmManager *GoVMManager) GetQueues() *util.QueueStruct {
	if len(inProgressChan) > 0 {
		govmManager.inProgress = <- inProgressChan
	}
	return &util.QueueStruct {
		Pending: govmManager.pendingQueue.ToArray(),
		InProgress: govmManager.inProgress,
		Completed: govmManager.completedQueue.ToArray(),
	}
}

// Gets the API-compatible struct for the status
func (govmManager *GoVMManager) GetStatus() *util.StatusStruct {
	return &util.StatusStruct {
		Memory: govmManager.memory.ConvertAPI(),
	}
}