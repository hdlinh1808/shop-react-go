package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

//Product struct
type Product struct {
	ObjectID         primitive.ObjectID     `bson:"_id,omitempty" json:"-"`
	ID               string                 `bson:"-" json:"id,omitempty"`
	Sku              string                 `bson:"sku,omitempty" json:"sku,omitempty"`
	Name             string                 `bson:"name,omitempty" json:"name,omitempty"`
	Description      string                 `bson:"description,omitempty" json:"description,omitempty"`
	Details          map[string]interface{} `bson:"details,omitempty" json:"details,omitempty"`
	Price            *ProductPrice          `bson:"pricing,omitempty" json:"price,omitempty"`
	Images           []string               `bson:"images,omitempty" json:"images,omitempty"`
	CategoryObjectID primitive.ObjectID     `bson:"primary_category,omitempty" json:"-"`
	CategoryID       string                 `bson:"-" json:"categoryId,omitempty"`
}

// ReinitObjectWithMongoDB convert ObjectID to string field
func (p *Product) ReinitObjectWithMongoDB() {
	p.ID = p.ObjectID.Hex()
	p.ObjectID = primitive.NilObjectID
	p.CategoryID = p.CategoryObjectID.Hex()
	p.CategoryObjectID = primitive.NilObjectID
}

//ProductPrice struct
type ProductPrice struct {
	Retail float64 `bson:"retail,omitempty" json:"retail,omitempty"`
	Sale   float64 `bson:"sale,omitempty" json:"sale,omitempty"`
}
