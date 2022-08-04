package govm

import (
	"github.com/joshuaseligman/GoVM-Web/server/internal/util"
	"github.com/joshuaseligman/GoVM/pkg/hardware/memory"
)

// The struct that will handle the programs and their execution
type GoVMManager struct {
	programQueue *util.Queue // The queue to run programs in
	memory *memory.Memory // The memory for the computer
	running bool // Variable for if it is running
}

// Function that creates a new GoVM Manager
func NewGoVMManager() *GoVMManager {
	govmManager := GoVMManager {
		programQueue: util.NewQueue(),
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
			if newProg := govmManager.programQueue.Dequeue(); newProg != nil {
				govmManager.running = true
				govmManager.memory.FlashProgram(newProg.Prog)
			}
		}
	}
}

// Gets the program queue
func (govmManager *GoVMManager) GetProgramQueue() *util.Queue {
	return govmManager.programQueue
}

// Gets the API-compatible struct for the status
func (govmManager *GoVMManager) GetStatus() *util.StatusStruct {
	return &util.StatusStruct {
		Memory: govmManager.memory.ConvertAPI(),
	}
}