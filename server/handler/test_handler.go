package handler

import (
	"net/http"

	"github.com/hdlinh1808/go-shop/utils"
)

// Test to test
func Test(writer http.ResponseWriter, request *http.Request) {
	m := make(map[string]string)
	m["message"] = "hello world!"
	utils.ResponseWithJSON(writer, 200, m)
}
