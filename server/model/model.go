package model

import (
	"context"
	"time"
)

var (
	//Success code
	Success = 0

	//Fail code
	Fail = -1

	//NotFound code
	NotFound = -2

	//Unauthorized code
	Unauthorized = -3

	//AffectedZeroRecord code
	AffectedZeroRecord = -4

	//IdentifyNotFound code
	IdentifyNotFound = -5

	//IndentifyNotValid code
	IndentifyNotValid = -6

	//FieldNotValid
	FieldNotValid = -7

	//BadRequest
	BadRequest = -8
)

//InitData func
func InitData() {
	GetAllCategoriesV2()
}

func getContext() (context.Context, context.CancelFunc) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	return ctx, cancel
}
