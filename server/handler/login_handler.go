package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/session"
	"github.com/hdlinh1808/go-shop/utils"
	log "github.com/sirupsen/logrus"
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

//Logout func
func Logout(w http.ResponseWriter, r *http.Request) {
	defer handleException(&w)
	var result *ActionResult

	sess := session.Instance(r)

	if sess.Values["id"] != nil { //logout success
		log.Info("remove session!")
		session.Empty(sess)
		sess.Options.MaxAge = -1
		sess.Save(r, w)
		// removeCookie(&w)
		result = getActionResult("Success", nil, model.Success)

		responseWithJSON(w, result)
		return
	}

	result = getActionResult("Fail", nil, model.Unauthorized)
	responseWithJSON(w, result)
}

func removeCookie(w *http.ResponseWriter) {
	c := &http.Cookie{
		Name:     "shopsess",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
	}

	http.SetCookie(*w, c)
}
