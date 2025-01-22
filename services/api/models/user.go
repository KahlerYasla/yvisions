package models

type User struct {
	ID       string `db:"id" json:"id"`
	Username string `db:"username" json:"username"`
	ImageURL string `db:"image_url" json:"imageURL"`
	Email    string `db:"email" json:"email"`
	Token    string `db:"token" json:"token"`
}
