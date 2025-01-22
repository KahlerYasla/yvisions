package handlers

import (
	"api/db"
	"api/models"

	"github.com/gofiber/fiber/v2"
)

func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	err := db.DB.Select(&users, "SELECT * FROM users")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch users",
		})
	}
	return c.JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	_, err := db.DB.Exec(
		"INSERT INTO users (id, username, image_url, email, token) VALUES ($1, $2, $3, $4, $5)",
		user.ID, user.Username, user.ImageURL, user.Email, user.Token,
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}
	return c.Status(fiber.StatusCreated).JSON(user)
}
