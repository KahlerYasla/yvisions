package models

import "api/models"

type Objective struct {
	ID                 string          `db:"id" json:"id"`
	Title              string          `db:"title" json:"title"`
	Description        string          `db:"description" json:"description"`
	Status             string          `db:"status" json:"status"`
	StartDate          string          `db:"start_date" json:"startDate"`
	Deadline           string          `db:"deadline" json:"deadline"`
	ProgressPercentage string          `db:"progress_percentage" json:"progressPercentage"`
	Assignees          []models.User   `json:"assignees"`
	Results            []models.Result `json:"results"`
	Effort             int             `db:"effort" json:"effort,omitempty"`
	Priority           int             `db:"priority" json:"priority,omitempty"`
	ProgressHistory    []int           `db:"progress_history" json:"progressHistory,omitempty"`
}
