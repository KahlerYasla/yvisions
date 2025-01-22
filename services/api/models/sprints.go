package models

type Sprint struct {
	ID        string   `db:"id" json:"id"`
	Name      string   `db:"name" json:"name"`
	StartDate string   `db:"start_date" json:"startDate"`
	EndDate   string   `db:"end_date" json:"endDate"`
	Tasks     []string `db:"tasks" json:"tasks"`
	Goal      string   `db:"goal" json:"goal"`
}
