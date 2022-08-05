package routes

import (
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joshuaseligman/GoVM-Web/server/internal/govm"
	"github.com/joshuaseligman/GoVM-Web/server/internal/util"
	"github.com/joshuaseligman/GoVM/pkg/assembler"
)

var (
	govmManager *govm.GoVMManager = govm.NewGoVMManager()
)

// Function that assembles the program and responds with the binary
func HandleAsmProg(c *gin.Context) {
	// Get the data from the request body
	if raw, err := c.GetRawData(); err != nil {
		// Return error if there is an error
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusBadRequest, gin.H {
			"err": err.Error(),
		})
	} else {
		// Convert the raw data into the struct for the program
		var prog util.ProgStruct
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
func HandleAddProg(c *gin.Context) {
	if raw, err := c.GetRawData(); err != nil {
		// Return error if there is an error
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusBadRequest, gin.H {
			"err": err.Error(),
		})
	} else {
		// Convert the raw data into the struct for the program
		var prog util.RunStruct
		json.Unmarshal(raw, &prog)

		govmManager.AddProgram(&prog)

		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusOK, govmManager.GetQueues())
	}
}

// Function that handles obtaining the status of the queue
func HandleQueueStatus(c *gin.Context) {
	// Update users every 1 second
	ticker := time.NewTicker(1 * time.Second)
	defer func() {
		ticker.Stop()
	}()

	// Stream the updated info to the user
	c.Stream(func(w io.Writer) bool {
		select {
		case <-ticker.C:
			// Send the "ping" event to the user with the updated queue
			c.Header("Access-Control-Allow-Origin", "*")
			c.SSEvent("ping", govmManager.GetQueues())
		}
		return true
	})
}

// Function that handles obtaining the status of the CPU
func HandleCpuStatus(c *gin.Context) {
	// Update users every 1 second
	ticker := time.NewTicker(1 * time.Second)
	defer func() {
		ticker.Stop()
	}()

	// Stream the updated info to the user
	c.Stream(func(w io.Writer) bool {
		select {
		case <-ticker.C:
			// Send the "ping" event to the user with the updated queue
			c.Header("Access-Control-Allow-Origin", "*")
			//c.SSEvent("ping", govmManager.GetStatus())
			c.SSEvent("ping", "Hello")
		}
		return true
	})
}