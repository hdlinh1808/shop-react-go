package handler

import (
	"encoding/json"
	"net/http"
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
	writer.WriteHeader(200)
	json.NewEncoder(writer).Encode(object)
}

func getActionResult(msg string, data interface{}, status int) *ActionResult {
	result := &ActionResult{Message: msg, Data: data, Status: &status}
	return result
}
