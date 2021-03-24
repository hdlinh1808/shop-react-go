package session

import (
	"net/http"

	"github.com/gorilla/sessions"
)

var (
	store *sessions.CookieStore
	name  string
)

// Session stores session level information
type Session struct {
	Options   sessions.Options `json:"Options"`   // Pulled from: http://www.gorillatoolkit.org/pkg/sessions#Options
	Name      string           `json:"Name"`      // Name for: http://www.gorillatoolkit.org/pkg/sessions#CookieStore.Get
	SecretKey string           `json:"SecretKey"` // Key for: http://www.gorillatoolkit.org/pkg/sessions#CookieStore.New
}

// Configure the session cookie store
func Configure(s Session) {
	store = sessions.NewCookieStore([]byte(s.SecretKey))
	store.Options = &s.Options
	name = s.Name
}

// Instance returns a new session, never returns an error
func Instance(r *http.Request) *sessions.Session {
	session, _ := store.Get(r, name)
	return session
}

// Empty deletes all the current session values
func Empty(sess *sessions.Session) {
	// Clear out all stored values in the cookie
	for k := range sess.Values {
		delete(sess.Values, k)
	}
}

// Save func
func Save(sess *sessions.Session, w *http.ResponseWriter, r *http.Request) {

}
