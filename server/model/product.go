package model

import (
	"context"
	"time"

	"github.com/hdlinh1808/go-shop/db/mongodb"
	"github.com/hdlinh1808/go-shop/entity"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//GetProductByID func
func GetProductByID(id string) (*entity.Product, int) {
	// collection := mongodb.ProductsCollection()
	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// defer cancel()
	// var product = new(entity.Product)
	// err := collection.FindOne(ctx, entity.Product).Decode(product)
	// if err == nil {
	// 	user.ID = user.ObjectID.Hex()
	// 	return user, Success
	// }
	return nil, Fail
}

// GetProductBySKU func
func GetProductBySKU(sku string) (*entity.Product, int) {
	collection := mongodb.ProductsCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var product = new(entity.Product)
	err := collection.FindOne(ctx, entity.Product{Sku: sku}).Decode(product)
	if err == nil {
		product.ReinitObjectWithMongoDB()
		return product, Success
	}
	return nil, Fail
}

// AddNewProduct func
func AddNewProduct(p *entity.Product) (string, int) {
	if p.SetCategoryObjectID(p.CategoryID) != nil {
		return "", FieldNotValid
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := mongodb.ProductsCollection().InsertOne(ctx, p)
	if err != nil {
		return "", Fail
	}

	newID := result.InsertedID.(primitive.ObjectID).Hex()
	return newID, Success
}

// DeleteProductByID func
func DeleteProductByID(id *string) int {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	objectID, err := primitive.ObjectIDFromHex(*id)
	if err != nil {
		return IndentifyNotValid
	}

	result, err := mongodb.ProductsCollection().DeleteOne(ctx, bson.M{"_id": objectID})

	if err != nil {
		log.Error(err.Error())
		return Fail
	}

	if result != nil && result.DeletedCount == 0 {
		return AffectedZeroRecord
	}
	return Success
}

// UpdateProductByID func
func UpdateProductByID(id *string, p *entity.Product) int {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if p.SetCategoryObjectID(p.CategoryID) != nil {
		return FieldNotValid
	}
	objectID, err := primitive.ObjectIDFromHex(*id)
	if err != nil {
		return IndentifyNotValid
	}

	result, err := mongodb.ProductsCollection().ReplaceOne(ctx,
		bson.M{"_id": objectID},
		p)
	if err != nil {
		log.Error(err.Error())
		return Fail
	}

	if result != nil && result.ModifiedCount == 0 {
		return AffectedZeroRecord
	}

	return Success
}
