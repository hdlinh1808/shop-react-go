package model

import (
	"context"
	"time"

	"github.com/hdlinh1808/go-shop/db/mongodb"
	"github.com/hdlinh1808/go-shop/entity"
)

//GetUserByID to get user from id
func GetUserByID(userID string) (*entity.User, int) {
	return nil, Success
}

//GetUserByEmail to get user from email
func GetUserByEmail(email string) (*entity.User, int) {
	collection := mongodb.UsersCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var user *entity.User
	user = new(entity.User)
	err := collection.FindOne(ctx, entity.User{Email: email}).Decode(user)
	if err == nil {
		user.ID = user.ObjectID.Hex()
		return user, Success
	}
	return nil, Fail
}
