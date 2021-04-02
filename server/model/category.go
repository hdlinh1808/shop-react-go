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

var mapCategories = make(map[string]*entity.Category)

// GetAllCategoriesV2 func
func GetAllCategoriesV2() (map[string]*entity.Category, int) {
	if len(mapCategories) == 0 {
		collection := mongodb.CategoriesCollection()
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		cursor, err := collection.Find(ctx, bson.M{})
		if err != nil {
			log.Error(err.Error())
			return nil, NotFound
		}
		for cursor.Next(ctx) {
			var c = new(entity.Category)
			if err = cursor.Decode(c); err != nil {
				log.Error(err.Error())
				return nil, NotFound
			}
			c.ReinitObjectWithMongoDB()
			mapCategories[c.GetID()] = c
		}
	}
	return mapCategories, Success
}

// AddNewCategory func
func AddNewCategory(c *entity.Category) int {
	c.LoadAncestorObjectID()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := mongodb.CategoriesCollection().InsertOne(ctx, c)
	if err != nil {
		log.Error(err.Error())
		return Fail
	}
	newID := result.InsertedID.(primitive.ObjectID).Hex()
	c.SetID(newID)
	mapCategories[c.GetID()] = c
	return Success
}

// UpdateCategory func
func UpdateCategory(id string, c *entity.Category) int {
	c.LoadAncestorObjectID()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return IndentifyNotValid
	}
	// opts := options.Update().SetUpsert(true)
	result, err := mongodb.CategoriesCollection().ReplaceOne(ctx, bson.M{"_id": objectID}, c)

	if err != nil {
		log.Error(err.Error())
		return Fail
	}

	if result != nil && result.ModifiedCount == 0 {
		return AffectedZeroRecord
	}

	mapCategories[id] = c
	return Success
}

// DeleteCategory func
func DeleteCategory(c *entity.Category) int {
	if !c.SetObjectID(c.ID) {
		return IndentifyNotValid
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := mongodb.CategoriesCollection().DeleteOne(ctx, c)
	if err != nil {
		log.Error(err.Error())
		return Fail
	}

	if result.DeletedCount == 0 {
		return AffectedZeroRecord
	}

	delete(mapCategories, c.ID)
	return Success
}

// GetAllCategories func
func GetAllCategories() (map[string]*entity.Category, int) {
	if len(mapCategories) == 0 {
		collection := mongodb.CategoriesCollection()
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		cursor, err := collection.Find(ctx, bson.M{})

		if err != nil {
			log.Error(err.Error())
			return nil, Fail
		}
		var categories []bson.M
		cursor.All(ctx, &categories)

		for _, categoryMap := range categories {
			var id = categoryMap["_id"].(primitive.ObjectID).Hex()
			var name = categoryMap["name"].(string)
			var slug = categoryMap["slug"].(string)
			var description = categoryMap["description"].(string)

			var ancestors = categoryMap["ancestors"].(primitive.A)
			var ancestorID = ""
			for _, ancestorMap := range ancestors {
				for key, value := range ancestorMap.(primitive.M) {
					if key == "_id" {
						ancestorID = value.(primitive.ObjectID).Hex()
					}
				}
				break
			}
			var c = &entity.Category{ID: id, Name: name, Slug: slug, Description: description, AncestorID: ancestorID}
			mapCategories[id] = c
		}
	}
	return mapCategories, Success
}
