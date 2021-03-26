package route

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hdlinh1808/go-shop/handler"
	"github.com/hdlinh1808/go-shop/middleware/acl"
)

//Routes to route request
func Routes() *mux.Router {
	r := mux.NewRouter()

	//for only test

	test := r.Methods("GET").Subrouter()
	test.HandleFunc("/hello", handler.Test)
	// test.Use(acl.DisallowAnon)

	//User
	r.HandleFunc("/users", handler.RegisterUser).Methods(http.MethodPost)
	// r.HandleFunc("/users", handler.GetAllUser)
	r.HandleFunc("/users/by", handler.GetUserByField).Methods(http.MethodGet)
	r.HandleFunc("/users/by-email", handler.UpdateUserByEmail).Methods(http.MethodPut)

	uByCookie := r.Methods(http.MethodGet).Subrouter()
	uByCookie.HandleFunc("/users/by-cookie", handler.GetUserByCookie)
	uByCookie.Use(acl.DisallowAnon)

	//Product
	r.HandleFunc("/products/{id}", handler.GetProductByID).Methods("GET")
	r.HandleFunc("/products/{id}", handler.DeleteProduct).Methods("DELETE")
	r.HandleFunc("/products", handler.AddNewProduct).Methods("POST")
	r.HandleFunc("/products", handler.UpdateProduct).Methods("PUT")
	r.HandleFunc("/products/by-sku/{sku}", handler.GetProductBySKU)

	//Category
	r.HandleFunc("/categories", handler.GetAllCategories).Methods("GET")
	r.HandleFunc("/categories", handler.CreateNewCategory).Methods("POST")
	r.HandleFunc("/categories", handler.DeleteCategory).Methods("DELETE")
	r.HandleFunc("/categories", handler.UpdateCategory).Methods("PUT")

	//Login
	login := r.Methods("POST").Subrouter()
	login.HandleFunc("/login", handler.Login)
	login.Use(acl.DisallowAuth)

	//logout
	logout := r.Methods(http.MethodGet).Subrouter()
	logout.HandleFunc("/logout", handler.Logout)
	logout.Use(acl.DisallowAnon)

	return r
}
