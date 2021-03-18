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

	//Product
	r.HandleFunc("/products/{id}", handler.GetProductByID)
	r.HandleFunc("/products/by-sku/{sku}", handler.GetProductBySKU)

	//Category
	r.HandleFunc("/categories", handler.GetAllCategories).Methods("GET")
	r.HandleFunc("/categories", handler.CreateNewCategory).Methods("POST")
	r.HandleFunc("/categories", handler.DeleteCategory).Methods("DELETE")
	r.HandleFunc("/categories", handler.UpdateCategory).Methods("PUT")
	return r
}
