package util

// Struct for a queue
type Queue struct {
	Head *ProgNode // The head of the queue
}

// Creates a new empty queue
func NewQueue() *Queue {
	queue := Queue{Head: nil}
	return &queue
}

// Adds the value to the end of the queue
func (queue *Queue) Enqueue(val *RunStruct) {
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

// Adds the value to the end of the queue
func (queue *Queue) EnqueueProg(val *Program) {
	newNode := NewNodeProg(val)
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
func (queue *Queue) Dequeue() *Program {
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

// Converts the queue to an array for easy use on the client side
func (queue *Queue) ToArray() []*Program {
	// Initialize the variables we will need
	out := make([]*Program, 0)
	cur := queue.Head

	// Add each program to the array
	for cur != nil {
		out = append(out, cur.Val)
		cur = cur.Next
	}

	// Return the array
	return out
}