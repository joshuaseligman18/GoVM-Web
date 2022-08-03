package util

// Struct to define the request body for /api/asmprog
type ProgStruct struct {
	Prog string `json:"prog"` // The program in assembly
}

// Struct to define the request body for /api/addprog
type RunStruct struct {
	Binary []uint32 `json:"binaryProg"` // The binary program
	ProgName string `json:"progName"` // The name of the program
}