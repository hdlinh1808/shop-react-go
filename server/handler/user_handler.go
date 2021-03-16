package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-blog/model"
	"github.com/hdlinh1808/go-blog/utils"
)

//GetAllUser to get all user of system.
func GetAllUser(writer http.ResponseWriter, request *http.Request) {

}

// GetUserByField to get user by any field supported
func GetUserByField(writer http.ResponseWriter, request *http.Request) {
	email := request.URL.Query().Get("email")
	// print(email)
	user, _ := model.GetUserByEmail(email)
	utils.ResponseWithJSON(writer, 200, user)
}
