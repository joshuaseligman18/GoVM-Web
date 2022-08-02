package main

import (
	"encoding/json"
	"net/http"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joshuaseligman/GoVM/pkg/assembler"
)

// Struct to define the request body for /api/asmprog
type ProgStruct struct {
	Prog string `json:"prog"` // The program in assembly
}

type RunStruct struct {
	Binary []uint32 `json:"binaryProg"` // The binary program
}

func main() {
	r := gin.Default()

	r.POST("/api/asmprog", handleAsmProg)
	r.POST("/api/addprog", handleAddProg)

	r.Use(cors.Default())
	r.Run(":8080")
}

// Function that assembles the program and responds with the binary
func handleAsmProg(c *gin.Context) {
	// Get the data from the request body
	if raw, err := c.GetRawData(); err != nil {
		// Return error if there is an error
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusBadRequest, gin.H {
			"err": err.Error(),
		})
	} else {
		// Convert the raw data into the struct for the program
		var prog ProgStruct
		json.Unmarshal(raw, &prog)

		// Assemble the program
		if binaryProg, err := assembler.AssembleProgramAPI(prog.Prog); err == nil {
			// Return the binary
			c.Header("Access-Control-Allow-Origin", "*")
			c.JSON(http.StatusOK, gin.H {
				"binaryProg": binaryProg,
			})
		} else {
			// Return the error
			c.Header("Access-Control-Allow-Origin", "*")
			c.JSON(http.StatusBadRequest, gin.H {
				"err": err.Error(),
			})
		}
	}
}

// Function that handles adding the program to the queue
func handleAddProg(c *gin.Context) {
	if raw, err := c.GetRawData(); err != nil {
		// Return error if there is an error
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusBadRequest, gin.H {
			"err": err.Error(),
		})
	} else {
		// Convert the raw data into the struct for the program
		var bin RunStruct
		json.Unmarshal(raw, &bin)

		fmt.Println(bin.Binary)

		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusOK, gin.H {
			"msg": "OK",
		})
	}
}