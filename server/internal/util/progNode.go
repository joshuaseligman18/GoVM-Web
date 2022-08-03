package util

// Struct for a node
type ProgNode struct {
	Val *Program // The program to store
	Next *ProgNode  // The next node in the list
}

// Function that creates a new node
func NewNode(data []uint32) *ProgNode {
	node := ProgNode{
		Val: NewProgram(data),
	}
	return &node
}

// Gets the value of the node
func (node *ProgNode) GetVal() *Program {
	return node.Val
}

// Sets the value of the node
func (node *ProgNode) SetVal(newVal *Program) {
	node.Val = newVal
}

// Gets the next node
func (node *ProgNode) GetNext() *ProgNode {
	return node.Next
}

// Sets the next node
func (node *ProgNode) SetNext(newNext *ProgNode) {
	node.Next = newNext
}
