package model

import (
	"context"
	"time"

	"github.com/hdlinh1808/go-blog/db/mongodb"
	"github.com/hdlinh1808/go-blog/entity"
)

//GetUserByID to get user from id
func GetUserByID(userID string) (*entity.User, error) {
	return nil, nil
}

//GetUserByEmail to get user from email
func GetUserByEmail(email string) (*entity.User, error) {
	collection := mongodb.UsersCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var user *entity.User
	user = new(entity.User)
	err := collection.FindOne(ctx, entity.User{}).Decode(user)
	if err == nil {
		return user, nil
	}
	// test()
	return nil, nil
}
