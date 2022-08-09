package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/joshuaseligman/GoVM-Web/server/internal/routes"
)

func main() {
	r := gin.Default()

	r.POST("/api/asmprog", routes.HandleAsmProg)
	r.POST("/api/addprog", routes.HandleAddProg)
	r.GET("/api/status", routes.HandleStatus)

	r.Use(cors.Default())
	r.Run(":8080")
}