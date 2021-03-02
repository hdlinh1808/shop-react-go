package mongodb

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connectionString = "mongodb://localhost:27017"
const dbName = "test"

var collection *mongo.Collection
var userCollection *mongo.Collection

// Init mongodb collection instance
func Init() {
	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		fmt.Println("error")
		return
	}

	collection = client.Database(dbName).Collection("appointment")
	// test()
	fmt.Println("Collection instance created!")
}

// GetUserCollection return collection "user"
func GetUserCollection() *mongo.Collection {
	return userCollection
}

type TestA struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Detail string             `json:"detail,omitempty" bson:"detail,omitempty"`
}

func test() {
	var t TestA
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, TestA{Detail: "please be on time"}).Decode(&t)
	if err == nil {
		fmt.Println(t)
	}

}
