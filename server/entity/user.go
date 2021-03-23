package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

// User struct
type User struct {
	ObjectID  primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	ID        string             `bson:"id,omitempty" json:"id,omitempty"`
	Username  string             `json:"username,omitempty" bson:"username,omitempty"`
	Email     string             `json:"email,omitempty" bson:"email,omitempty"`
	FirstName string             `json:"first_name,omitempty" bson:"first_name,omitempty"`
	LastName  string             `json:"last_name,omitempty" bson:"last_name,omitempty"`
	FullName  string             `json:"name,omitempty" bson:"name,omitempty"`
	Password  string             `json:"password,omitempty" bson:"hashed_password,omitempty"`
	Addresses []Address          `json:"addresses,omitempty" bson:"addresses,omitempty"`
}

// Address struct
type Address struct {
	Name   string `bson:"name,omitempty" json:"name,omitempty"`
	Street string `bson:"street,omitempty" json:"street,omitempty"`
	City   string `bson:"city,omitempty" json:"city,omitempty"`
}
