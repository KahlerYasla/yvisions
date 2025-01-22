package db

type ReportQuery struct {
	Name string
	SQL  string
}

var Queries = map[string]ReportQuery{
	"ObjectivesOverview":    {Name: "Objectives Overview", SQL: "SELECT * FROM get_objectives_overview()"},
	"KeyResultsOverview":    {Name: "Key Results Overview", SQL: "SELECT * FROM get_key_results_overview()"},
	"CompletionTrends":      {Name: "Completion Trends", SQL: "SELECT * FROM get_completion_trends()"},
	"ObjectivesPerUser":     {Name: "Objectives Per User", SQL: "SELECT * FROM get_objectives_per_user()"},
	"KeyResultsByAssignee":  {Name: "Key Results by Assignee", SQL: "SELECT * FROM get_key_results_by_assignee()"},
	"AssigneeContributions": {Name: "Assignee Contributions", SQL: "SELECT * FROM get_assignee_contributions()"},
}
