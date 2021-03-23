package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-shop/entity"
	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/utils"
)

//GetAllUser to get all user of system.
func GetAllUser(writer http.ResponseWriter, request *http.Request) {

}

// GetUserByField to get user by any field supported
func GetUserByField(writer http.ResponseWriter, request *http.Request) {
	email := request.URL.Query().Get("email")
	user, statusCode := model.GetUserByEmail(email)
	if statusCode == model.Success {
		utils.ResponseWithJSON(writer, http.StatusOK, user)
	}
}

func validUser() (status int, msg string) {
	return
}

// RegisterUser func
func RegisterUser(w http.ResponseWriter, r *http.Request) {
	u := new(entity.User)
	defer handleException(&w)
	err := utils.DecoderJSONObject(&r.Body, u)
	if err != nil {
		panic(err)
	}
	var result *ActionResult
	status := model.CreateNewUser(u)
	switch status {
	case model.Success:
		result = getActionResult("Success", nil, status)
		break
	case model.FieldNotValid:
		result = getActionResult("Field(s) is not valid!", nil, status)
		break
	default:
		result = getActionResult("Fail", nil, model.Fail)
		break
	}
	responseWithJSON(w, result)
}

//UpdateUserByEmail func
func UpdateUserByEmail(w http.ResponseWriter, r *http.Request) {
	u := new(entity.User)
	defer handleException(&w)
	err := utils.DecoderJSONObject(&r.Body, u)
	if err != nil {
		panic(err)
	}
	var result *ActionResult
	status := model.UpdateUserByEmail(u)
	switch status {
	case model.Success:
		result = getActionResult("Success", nil, status)
		break
	default:
		result = getActionResult("Fail", nil, model.Fail)
		break
	}
	responseWithJSON(w, result)
}
