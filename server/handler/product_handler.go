package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-blog/entity"
	"github.com/hdlinh1808/go-blog/log"

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

	var result *ActionResult
	if status == model.Success {
		result = getActionResult("Sucess", product, model.Success)
	} else {
		result = getActionResult("Fail", product, model.Fail)
	}
	responseWithJSON(writer, result)
}

// AddNewProduct func
func AddNewProduct(w http.ResponseWriter, r *http.Request) {
	p := new(entity.Product)
	err := utils.DecoderJSONObject(&r.Body, p)
	var result *ActionResult
	if err != nil {
		log.Error(err.Error())
		result = getActionResult("Fail", nil, model.Fail)
		responseWithJSON(w, result)
		return
	}

	newID, status := model.AddNewProduct(p)

	switch status {
	case model.Success:
		mapData := make(map[string]string)
		mapData["id"] = newID
		result = getActionResult("Success", mapData, status)
		break
	case model.FieldNotValid:
		result = getActionResult("Field(s) is not valid!", nil, status)
		break
	default:
		result = getActionResult("Fail", nil, model.Fail)
		break
	}
	responseWithJSON(w, result)
}

// UpdateProduct func
func UpdateProduct(w http.ResponseWriter, r *http.Request) {
	p := new(entity.Product)
	err := utils.DecoderJSONObject(&r.Body, p)

	var result *ActionResult
	if err != nil {
		log.Error(err.Error())
		result = getActionResult("Fail", nil, model.Fail)
		responseWithJSON(w, result)
		return
	}

	status := model.UpdateProductByID(&p.ID, p)
	print(status)
	switch status {
	case model.Success:
		result = getActionResult("Success", nil, status)
		break
	case model.AffectedZeroRecord:
		result = getActionResult("Fail. No record affected, maybe id not found.", nil, status)
		break
	case model.IndentifyNotValid:
		result = getActionResult("Fail. Wrong id.", nil, status)
		break
	default:
		result = getActionResult("Fail", nil, model.Fail)
		break
	}
	responseWithJSON(w, result)

}

// DeleteProduct func
func DeleteProduct(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var result *ActionResult
	status := model.DeleteProductByID(&id)
	switch status {
	case model.Success:
		result = getActionResult("Success", nil, status)
		break
	case model.AffectedZeroRecord:
		result = getActionResult("Fail. No record affected, maybe id not found.", nil, status)
		break
	default:
		result = getActionResult("Fail", nil, model.Fail)
		break
	}
	responseWithJSON(w, result)
}

func checkProductInfo() (bool, string) {
	return true, ""
}
