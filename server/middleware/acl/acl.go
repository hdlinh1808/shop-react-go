package acl

import (
	"net/http"

	"github.com/hdlinh1808/go-shop/handler"
	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/session"
	"github.com/hdlinh1808/go-shop/utils"
)

// DisallowAuth does not allow authenticated users to access the page
func DisallowAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get session
		sess := session.Instance(r)

		// If user is authenticated, don't allow them to access the page
		if sess.Values["id"] != nil {
			actionResult := &handler.ActionResult{Message: "Account is logged in", Data: nil, Status: &model.LoggedIn}
			utils.ResponseWithJSON(w, actionResult)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// DisallowAnon does not allow anonymous users to access the page
func DisallowAnon(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get session
		sess := session.Instance(r)

		// If user is not authenticated, don't allow them to access the page
		if sess.Values["id"] == nil {
			actionResult := &handler.ActionResult{Message: "Unauthorized", Data: nil, Status: &model.Unauthorized}
			utils.ResponseWithJSON(w, actionResult)
			return
		}

		h.ServeHTTP(w, r)
	})
}
