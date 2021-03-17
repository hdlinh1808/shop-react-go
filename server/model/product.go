package model

import (
	"context"
	"fmt"
	"time"

	"github.com/hdlinh1808/go-blog/db/mongodb"
	"github.com/hdlinh1808/go-blog/entity"
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

//GetProductBySKU func
func GetProductBySKU(sku string) (*entity.Product, int) {
	collection := mongodb.ProductsCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var product = new(entity.Product)
	err := collection.FindOne(ctx, entity.Product{Sku: sku}).Decode(product)
	fmt.Print(product)
	if err == nil {
		product.ID = product.ObjectID.Hex()
		return product, Success
	}
	return nil, Fail
}
