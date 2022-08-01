package main

import (
	// "github.com/joshuaseligman/GoVM/pkg/assembler"

	"fmt"

	"net/http"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.POST("/api/asmprog", handleAsmProg)

	r.Run(":8080")
}

func handleAsmProg(c *gin.Context) {
	c.Request.ParseForm()
	fmt.Println(c.Request.PostForm.Get("prog"))
	c.JSON(http.StatusOK, gin.H {
		"msg": "hello",
	})
}