package models

type Result struct {
	ID                 string  `db:"id" json:"id"`
	ObjectiveID        string  `db:"objective_id" json:"objectiveID"`
	Title              string  `db:"title" json:"title"`
	Description        string  `db:"description" json:"description"`
	TargetValue        float64 `db:"target_value" json:"targetValue"`
	CurrentValue       float64 `db:"current_value" json:"currentValue"`
	InitialValue       float64 `db:"initial_value" json:"initialValue"`
	ProgressPercentage float64 `db:"progress_percentage" json:"progressPercentage"`
	Status             string  `db:"status" json:"status"`
	OwnerID            *string `db:"owner_id" json:"owner"`
	Deadline           string  `db:"deadline" json:"deadline"`
	StartDate          string  `db:"start_date" json:"startDate"`
	Weight             float64 `db:"weight" json:"weight"`
}
