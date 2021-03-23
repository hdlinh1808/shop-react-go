package model

import (
	"context"
	"time"

	"github.com/hdlinh1808/go-shop/db/mongodb"
	"github.com/hdlinh1808/go-shop/entity"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
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
	log.Error(err.Error())
	return nil, Fail
}

//CreateNewUser func
func CreateNewUser(user *entity.User) int {
	ctx, cancel := getContext()
	defer cancel()
	_, err := mongodb.UsersCollection().InsertOne(ctx, user)

	if err != nil {
		log.Error(err.Error())
		return Fail
	}
	return Success
}

// UpdateUserByEmail func
func UpdateUserByEmail(user *entity.User) int {
	ctx, cancel := getContext()
	defer cancel()
	result, err := mongodb.UsersCollection().ReplaceOne(ctx, bson.M{"email": user.Email}, user)

	if err != nil {
		log.Error(err.Error())
		return Fail
	}

	if result != nil && result.ModifiedCount == 0 {
		return AffectedZeroRecord
	}

	return Success
}
