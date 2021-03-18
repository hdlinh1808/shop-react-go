package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-blog/entity"
	"github.com/hdlinh1808/go-blog/log"

	"github.com/hdlinh1808/go-blog/model"
	"github.com/hdlinh1808/go-blog/utils"
)

// GetAllCategories func
func GetAllCategories(writer http.ResponseWriter, request *http.Request) {
	result, status := model.GetAllCategoriesV2()
	if status == model.Success {
		utils.ResponseWithJSON(writer, 200, result)
	}
}

// CreateNewCategory func
func CreateNewCategory(w http.ResponseWriter, r *http.Request) {
	var c *entity.Category
	c = new(entity.Category)
	err := utils.DecoderJSONObject(&r.Body, c)
	if err != nil {
		return
	}
	status := model.AddNewCategory(c)
	var result *ActionResult

	if status == model.Success {
		result = getActionResult("Success", nil, status)
	} else if status == model.Fail {
		result = getActionResult("Fail", nil, status)
	}
	responseWithJSON(w, result)
}

// DeleteCategory func
func DeleteCategory(w http.ResponseWriter, r *http.Request) {
	var c *entity.Category
	c = new(entity.Category)
	err := utils.DecoderJSONObject(&r.Body, c)
	var result *ActionResult
	if err != nil {
		log.Error(err.Error())
		result = getActionResult("Fail", nil, model.Fail)
		responseWithJSON(w, result)
		return
	}
	status := model.DeleteCategory(c)

	switch status {
	case model.Success:
		result = getActionResult("Success", nil, status)
		break
	case model.AffectedZeroRecord:
		result = getActionResult("Fail. No record affected, maybe wrong id.", nil, status)
		break
	default:
		result = getActionResult("Fail", nil, model.Fail)
		break
	}
	responseWithJSON(w, result)
}

// UpdateCategory func
func UpdateCategory(w http.ResponseWriter, r *http.Request) {
	var c *entity.Category
	c = new(entity.Category)
	err := utils.DecoderJSONObject(&r.Body, c)
	if err != nil {
		log.Error(err.Error())
		return
	}
	status := model.UpdateCategory(c.ID, c)
	var result *ActionResult

	switch status {
	case model.Success:
		result = getActionResult("Success", nil, status)
		break
	case model.AffectedZeroRecord:
		result = getActionResult("Fail. No record affected, maybe wrong id.", nil, status)
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
