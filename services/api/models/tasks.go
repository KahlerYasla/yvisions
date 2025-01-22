package models

type Task struct {
	ID                    string   `db:"id" json:"id"`
	ReporterUserID        string   `db:"reporter_user_id" json:"reporterUserID"`
	WatcherUserIDs        []string `db:"watcher_user_ids" json:"watcherUserIDs"`
	PrimaryAssignedUserID string   `db:"primary_assigned_user_id" json:"primaryAssignedUserID"`
	AssignedUserIDs       []string `db:"assigned_user_ids" json:"assignedUserIDs"`
	Title                 string   `db:"title" json:"title"`
	Description           string   `db:"description" json:"description"`
	CreationDate          string   `db:"creation_date" json:"creationDate"`
	Deadline              string   `db:"deadline" json:"deadline"`
	SprintID              *string  `db:"sprint_id" json:"sprintID,omitempty"`
	Tags                  []string `db:"tags" json:"tags"`
	Status                string   `db:"status" json:"status"`
}
