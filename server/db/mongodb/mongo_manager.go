package mongodb

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connectionString = "mongodb://localhost:27017"
const dbName = "ecomerce_shop"

var usersCollection *mongo.Collection
var testCollection *mongo.Collection

// Init mongodb collection instance
func Init() {
	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		fmt.Println("error")
		return
	}
	database := client.Database(dbName)
	usersCollection = database.Collection("users")
	testCollection = database.Collection("test")
}

// UsersCollection to get collection for user;
func UsersCollection() *mongo.Collection {
	return usersCollection
}

func TestCollection() *mongo.Collection {
	return testCollection
}
