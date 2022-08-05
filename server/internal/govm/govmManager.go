package govm

import (
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
				govmManager.inProgress = newProg
				govmManager.memory.FlashProgram(govmManager.inProgress.Prog)
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