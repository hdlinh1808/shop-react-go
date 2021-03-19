package entity

import (
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Category struct
type Category struct {
	ObjectID         primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	ID               string             `bson:"-" json:"id,omitempty"`
	AncestorObjectID primitive.ObjectID `bson:"parent_id,omitempty" json:"-"`
	AncestorID       string             `bson:"-" json:"parentId,omitempty"`
	Name             string             `bson:"name,omitempty" json:"name,omitempty"`
	Description      string             `bson:"description,omitempty" json:"description,omitempty"`
	Slug             string             `bson:"slug,omitempty" json:"slug,omitempty"`
}

// ReinitObjectWithMongoDB convert ObjectID to string field
func (c *Category) ReinitObjectWithMongoDB() {
	c.ID = c.ObjectID.Hex()
	// c.ObjectID = primitive.NilObjectID
	if !c.AncestorObjectID.IsZero() {
		c.AncestorID = c.AncestorObjectID.Hex()
	}
	// c.AncestorObjectID = primitive.NilObjectID
}

//GetID func
func (c *Category) GetID() string {
	if !c.ObjectID.IsZero() {
		return c.ObjectID.Hex()
	}
	return c.ID
}

// LoadAncestorObjectID func for mongodb
func (c *Category) LoadAncestorObjectID() bool {
	var err error
	c.AncestorObjectID, err = primitive.ObjectIDFromHex(c.AncestorID)
	if err != nil {
		log.Error(err.Error())
		return false
	}

	return true
}

//SetID func
func (c *Category) SetID(id string) bool {
	result := c.SetObjectID(id)
	if result {
		c.ID = id
	}
	return result
}

//SetObjectID func
func (c *Category) SetObjectID(id string) bool {
	var err error
	c.ObjectID, err = primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Error(err.Error())
		return false
	}
	return true
}
