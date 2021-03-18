package utils

import (
	"encoding/json"
	"io"
	"net/http"
)

// ResponseWithJSON respone a json object
func ResponseWithJSON(writer http.ResponseWriter, status int, object interface{}) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	json.NewEncoder(writer).Encode(object)
}

// DecoderJSONObject func
func DecoderJSONObject(r *io.ReadCloser, o interface{}) error {
	err := json.NewDecoder(*r).Decode(o)
	return err
}
