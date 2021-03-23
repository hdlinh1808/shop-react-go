package handler

import (
	"encoding/json"
	"net/http"
	"runtime/debug"

	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/utils"
	log "github.com/sirupsen/logrus"
)

//ActionResult struct
type ActionResult struct {
	Data    interface{} `json:"data,omitempty"`
	Message string      `json:"message,omitempty"`
	Status  *int        `json:"error,omitempty"`
}

//responseWithJSON func
func responseWithJSON(writer http.ResponseWriter, object interface{}) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(object)
}

func getActionResult(msg string, data interface{}, status int) *ActionResult {
	result := &ActionResult{Message: msg, Data: data, Status: &status}
	return result
}

func handleException(w *http.ResponseWriter) {
	if r := recover(); r != nil {
		log.Error("Unhandle error: ", r, "\n", string(debug.Stack()))
		responseWithJSON(*w, getActionResult("Bad request", nil, model.BadRequest))
	}
}

func decoderJSONObjectWithHandleError(w http.ResponseWriter, r *http.Request, o interface{}) {
	defer handleException(&w)
	err := utils.DecoderJSONObject(&r.Body, o)
	if err != nil {
		panic(err)
	}
}
