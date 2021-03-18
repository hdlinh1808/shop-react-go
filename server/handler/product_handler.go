package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-blog/model"
	"github.com/hdlinh1808/go-blog/utils"

	"github.com/gorilla/mux"
)

// GetProductByID func
func GetProductByID(writer http.ResponseWriter, request *http.Request) {
	// vars := mux.Vars(request)
	// id := vars["id"]

}

// GetProductBySKU func
func GetProductBySKU(writer http.ResponseWriter, request *http.Request) {
	sku := mux.Vars(request)["sku"]
	product, status := model.GetProductBySKU(sku)
	if status == model.Success {
		utils.ResponseWithJSON(writer, 200, product)
	}
}

// AddNewProduct func
func AddNewProduct(writer http.ResponseWriter, request *http.Request) {

}

// UpdateProduct func
func UpdateProduct(writer http.ResponseWriter, request *http.Request) {

}

// RemoveProduct func
func DeleteProduct(writer http.ResponseWriter, request *http.Request) {

}
