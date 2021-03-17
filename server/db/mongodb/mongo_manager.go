package mongodb

import (
	"context"

	"github.com/hdlinh1808/go-blog/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connectionString = "mongodb://localhost:27017"
const dbName = "ecomerce_shop"

var usersCollection *mongo.Collection
var productsCollection *mongo.Collection
var testCollection *mongo.Collection

// Init mongodb collection instance
func Init() {
	log.Info("Init mongodb instance....")
	clientOptions := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Error(err.Error())
		return
	}

	log.Info("Init mongodb done...")
	database := client.Database(dbName)
	usersCollection = database.Collection("users")
	productsCollection = database.Collection("products")
	testCollection = database.Collection("test")
}

// UsersCollection to get collection for user;
func UsersCollection() *mongo.Collection {
	return usersCollection
}

// TestCollection collection
func TestCollection() *mongo.Collection {
	return testCollection
}

// ProductsCollection collection
func ProductsCollection() *mongo.Collection {
	return productsCollection
}
