package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/session"
	"github.com/hdlinh1808/go-shop/utils"
)

//Account struct
type Account struct {
	Email    string `json:"email,omitempty"`
	Password string `json:"password,omitempty"`
}

//Login func
func Login(w http.ResponseWriter, r *http.Request) {
	defer handleException(&w)
	sess := session.Instance(r)
	// valid field
	var result *ActionResult
	a := new(Account)
	err := utils.DecoderJSONObject(&r.Body, a)
	if err != nil {
		panic(err)
	}

	if a.Email == "" || a.Password == "" {
		result = getActionResult("Field should not be empty!", nil, model.FieldNotValid)
		responseWithJSON(w, result)
		return
	}

	user, _ := model.GetUserByEmail(a.Email)

	if user == nil {
		result = getActionResult("Email not exist!", nil, model.NotFound)
	} else if !utils.MatchString(user.Password, a.Password) { // wrong password
		result = getActionResult("Fail", nil, model.Fail)
	} else {
		result = getActionResult("Success", nil, model.Success)

		// Login success
		session.Empty(sess)
		sess.Values["id"] = user.ID
		sess.Values["email"] = a.Email
		sess.Save(r, w)
	}

	responseWithJSON(w, result)
}
