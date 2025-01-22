package main

import (
	"log"

	"api/config"
	"api/db"
	"api/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func setupRoutes(app *fiber.App) {
	// User Routes
	app.Get("/api/users", handlers.GetUsers)
	app.Post("/api/users", handlers.CreateUser)

	// Objective Routes
	app.Get("/api/objectives", handlers.GetObjectives)
	app.Post("/api/objectives", handlers.CreateObjective)

	// Result Routes
	app.Get("/api/results", handlers.GetResults)
	app.Post("/api/results", handlers.CreateResult)

	// Task Routes
	app.Get("/api/tasks", handlers.GetTasks)
	app.Post("/api/tasks", handlers.CreateTask)

	// Sprint Routes
	app.Get("/api/sprints", handlers.GetSprints)
	app.Post("/api/sprints", handlers.CreateSprint)

	// Reports
	app.Get("/api/report/:reportType", handlers.FetchReport)

	// Static file serving
	app.Get("/files/:filename", handlers.ServeFile)
}

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Connect to the database
	db.Connect(cfg)

	// Create a new Fiber app
	app := fiber.New()

	// Middlewares
	app.Use(logger.New()) // Logging middleware
	app.Use(cors.New())   // CORS middleware to allow requests from React and React Native

	// Setup routes
	setupRoutes(app)

	// Start the server
	log.Println("Server is running on http://localhost:3000")
	log.Fatal(app.Listen(":3000"))
}
