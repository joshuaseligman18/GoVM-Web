package routes

import (
	"encoding/json"
	"net/http"
	"strconv"

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

// Function that handles the overall status of the GoVM manager
func HandleStatus(c *gin.Context) {
	status := util.StatusStruct {
		Queues: govmManager.GetQueues(),
		CpuStatus: govmManager.GetStatus(),
	}
	// Send the "ping" event to the user with the updated status
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, status)
}

func HandleFinalStatus(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)

	if err == nil {
		finalStatus := govm.GetFinalStatus(id)
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusOK, finalStatus)
	} else {
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusBadRequest, gin.H {
			"msg": "Invalid ID",
		})
	}
}