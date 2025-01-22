package handlers

import (
	"api/db"
	"api/models"

	"github.com/gofiber/fiber/v2"
)

func FetchReport(c *fiber.Ctx) error {
	reportType := c.Params("reportType")

	query, ok := db.Queries[reportType]
	if !ok {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Report type not found",
		})
	}

	var result []map[string]interface{}
	err := db.DB.Select(&result, query.SQL)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to execute report query",
		})
	}

	return c.JSON(models.ReportResult{Data: result})
}

func ServeFile(c *fiber.Ctx) error {
	return c.SendFile("./static/" + c.Params("filename"))
}
