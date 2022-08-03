package util

import (
	"fmt"
	"strings"
)

// Struct for a queue
type Queue struct {
	Head *ProgNode `json:"head"` // The head of the queue
}

// Creates a new empty queue
func NewQueue() *Queue {
	queue := Queue{Head: nil}
	return &queue
}

// Adds the value to the end of the queue
func (queue *Queue) Enqueue(val []uint32) {
	newNode := NewNode(val)
	if queue.Head == nil {
		queue.Head = newNode
	} else {
		cur := queue.Head
		for cur.GetNext() != nil {
			cur = cur.GetNext()
		}
		cur.SetNext(newNode)
	}
}

// Removes the top element from the queue
func (queue *Queue) Dequeue() []uint32 {
	if queue.Head != nil {
		val := queue.Head.GetVal()
		queue.Head = queue.Head.GetNext()
		return val
	}
	return nil
}

// Gets the head of the queue
func (queue *Queue) GetHead() *ProgNode {
	return queue.Head
}

// Gets the string representation of the queue
func (queue *Queue) ToString() string {
	var str strings.Builder
	cur := queue.Head

	for cur != nil {
		str.WriteString(fmt.Sprintf("{%d: %d} ", cur.Id, cur.Prog))
		cur = cur.Next
	}
	return str.String()
}
