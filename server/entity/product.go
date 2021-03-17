package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

//Product struct
type Product struct {
	ObjectID    primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	ID          string             `bson:"id,omitempty" json:"id,omitempty"`
	Sku         string             `bson:"sku,omitempty" json:"sku,omitempty"`
	Name        string             `bson:"name,omitempty" json:"name,omitempty"`
	Description string             `bson:"description,omitempty" json:"description,omitempty"`
	Details     string             `bson:"detail,omitempty" json:"detail,omitempty"`
	Price       *ProductPrice      `bson:"pricing,omitempty" json:"price,omitempty"`
	// CategoryID float64      `bson:"primary_category,omitempty" json:"primary_category,omitempty"`
}

//ProductPrice struct
type ProductPrice struct {
	Retail float64 `bson:"retail,omitempty" json:"retail,omitempty"`
	Sale   float64 `bson:"sale,omitempty" json:"sale,omitempty"`
}
