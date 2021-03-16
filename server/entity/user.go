package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

// User struct
type User struct {
	ObjectID  primitive.ObjectID `bson:"_id,omitempty"`
	ID        string             `bson:"id,omitempty" json:"id,omitempty"` // use for mysql not mongo
	Username  string             `json:"username,omitempty" bson:"username,omitempty"`
	Email     string             `json:"email,omitempty" bson:"email,omitempty"`
	FirstName string             `json:"first_name,omitempty" bson:"first_name,omitempty"`
	LastName  string             `json:"last_name,omitempty" bson:"last_name,omitempty"`
	Password  string             `json:"hashed_password,omitempty" bson:"hashed_password,omitempty"`
}
