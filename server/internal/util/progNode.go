package util

import (
	"math/rand"
)

// Struct for a node
type ProgNode struct {
	Id   int       `json:"id"`   // The id of the program
	Prog []uint32  `json:"prog"`  // The value of the node
	Next *ProgNode `json:"next"` // The next node in the list
}

// Function that creates a new node
func NewNode(data []uint32) *ProgNode {
	node := ProgNode{
		Id:   rand.Int(),
		Prog: data,
	}
	return &node
}

// Gets the value of the node
func (node *ProgNode) GetVal() []uint32 {
	return node.Prog
}

// Sets the value of the node
func (node *ProgNode) SetVal(newVal []uint32) {
	node.Prog = newVal
}

// Gets the next node
func (node *ProgNode) GetNext() *ProgNode {
	return node.Next
}

// Sets the next node
func (node *ProgNode) SetNext(newNext *ProgNode) {
	node.Next = newNext
}
