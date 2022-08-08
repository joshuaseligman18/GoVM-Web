package util

import (
	"github.com/joshuaseligman/GoVM/pkg/hardware/cpu"
)

// Struct to define the request body for /api/asmprog
type ProgStruct struct {
	Prog string `json:"prog"` // The program in assembly
}

// Struct to define the request body for /api/addprog
type RunStruct struct {
	Binary []uint32 `json:"binaryProg"` // The binary program
	ProgName string `json:"progName"` // The name of the program
}

// Struct to define the output of the status of the running program
type StatusStruct struct {
	Cpu *cpu.CpuAPI `json:"cpu"` // The CPU and its status
}

// Struct to define the output of the queue status
type QueueStruct struct {
	Completed []*Program `json:"completed"`
	InProgress *Program `json:"inProgress"`
	Pending []*Program `json:"pending"`
}