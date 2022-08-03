package util

import (
	"fmt"
	"math/rand"
	"time"
)

// Struct to represent the program for the queue
type Program struct {
	Id   int       `json:"id"`   // The id of the program
	TimeCreated time.Time `json:"created"` // The time the node was created
	Prog []uint32  `json:"prog"`  // The value of the node
	Name string `json:"progName"` // The name of the program
}

// Function that creates a new program
func NewProgram(data *RunStruct) *Program {
	program := Program {
		Id: rand.Int(),
		TimeCreated: time.Now(),
		Prog: data.Binary,
	}
	if data.ProgName == "" {
		program.Name = fmt.Sprint(program.Id)
	} else {
		program.Name = data.ProgName
	}
	return &program
}