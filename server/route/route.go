package route

import (
	"github.com/gorilla/mux"
	"github.com/hdlinh1808/go-blog/handler"
)

//Routes to route request
func Routes() *mux.Router {
	r := mux.NewRouter()

	//for only test
	r.HandleFunc("/hello", handler.Test)

	//User
	r.HandleFunc("/users", handler.GetAllUser)
	r.HandleFunc("/users/by", handler.GetUserByField)
	return r
}
