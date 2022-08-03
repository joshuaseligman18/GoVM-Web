package util

import (
	"math/rand"
	"time"
)

// Struct to represent the program for the queue
type Program struct {
	Id   int       `json:"id"`   // The id of the program
	TimeCreated time.Time `json:"created"` // The time the node was created
	Prog []uint32  `json:"prog"`  // The value of the node
}

// Function that creates a new program
func NewProgram(data []uint32) *Program {
	program := Program {
		Id: rand.Int(),
		TimeCreated: time.Now(),
		Prog: data,
	}
	return &program
}