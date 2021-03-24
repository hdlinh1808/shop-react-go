package middleware

import (
	"net/http"

	"github.com/sirupsen/logrus"
)

func MiddlewareTest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logrus.Info("Debug")
		next.ServeHTTP(w, r)
	})
}
