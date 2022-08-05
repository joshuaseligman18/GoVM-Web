package util

import "github.com/joshuaseligman/GoVM/pkg/hardware/memory"

// Struct to define the request body for /api/asmprog
type ProgStruct struct {
	Prog string `json:"prog"` // The program in assembly
}

// Struct to define the request body for /api/addprog
type RunStruct struct {
	Binary []uint32 `json:"binaryProg"` // The binary program
	ProgName string `json:"progName"` // The name of the program
}

type StatusStruct struct {
	Memory *memory.MemoryAPI `json:"memory"` // The memory to return
}

type QueueStruct struct {
	Completed []*Program `json:"completed"`
	InProgress *Program `json:"inProgress"`
	Pending []*Program `json:"pending"`
}