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
	Binary   []uint32 `json:"binaryProg"` // The binary program
	ProgName string   `json:"progName"`   // The name of the program
}

// Struct to define the output of the status of the running program
type CpuStatusStruct struct {
	Cpu *cpu.CpuAPI `json:"cpu"` // The CPU and its status
}

// Struct to define the output of the queue status
type QueueStruct struct {
	Completed  []*Program `json:"completed"`
	InProgress *Program   `json:"inProgress"`
	Pending    []*Program `json:"pending"`
}

// The overall status struct for both the queues and the CPU status
type StatusStruct struct {
	Queues *QueueStruct `json:"queues"`
	CpuStatus *CpuStatusStruct `json:"cpuStatus"`
}

// The struct for the final status of a running program
type FinalStatusStruct struct {
	Program *Program `json:"prog"`
	FinalCpu *cpu.CpuAPI `json:"finalStatus"`
}