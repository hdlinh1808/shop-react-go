package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-shop/entity"
	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/session"
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
		utils.ResponseWithJSON(writer, user)
	}
}

// GetUserByCookie get user info from cookie
func GetUserByCookie(w http.ResponseWriter, r *http.Request) {

	sess := session.Instance(r)
	defer handleException(&w)

	if session.GetSessionID(sess) == nil {
		responseWithJSON(w, getActionResult("something went wrong!", nil, model.Fail))
		return
	}

	id := session.GetSessionID(sess).(string)
	user, status := model.GetUserByID(id)
	var result *ActionResult
	switch status {
	case model.Success:
		user.Password = ""
		result = getActionResult("Success", user, status)
		break
	default:
		result = getActionResult("Fail", nil, status)
		break
	}
	responseWithJSON(w, result)
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
	u.Password, err = utils.HashString(u.Password)
	var result *ActionResult
	if err != nil {
		result = getActionResult("Fail! Server has error", nil, model.Fail)
	}

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
