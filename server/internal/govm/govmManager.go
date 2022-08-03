package govm

import "github.com/joshuaseligman/GoVM-Web/server/internal/util"

// The struct that will handle the programs and their execution
type GoVMManager struct {
	programQueue *util.Queue // The queue to run programs in
}

// Function that creates a new GoVM Manager
func NewGoVMManager() *GoVMManager {
	govmManager := GoVMManager {
		programQueue: util.NewQueue(),
	}
	return &govmManager
}

// Gets the program queue
func (govmManager *GoVMManager) GetProgramQueue() *util.Queue {
	return govmManager.programQueue
}