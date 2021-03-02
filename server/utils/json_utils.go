package utils

import (
	"encoding/json"
	"net/http"
)

// ResponseWithJSON respone a json object
func ResponseWithJSON(writer http.ResponseWriter, status int, object interface{}) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	json.NewEncoder(writer).Encode(object)
}
