package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/hdlinh1808/go-blog/db/mongodb"
	"github.com/hdlinh1808/go-blog/handler"
)

func main() {
	mongodb.Init()
	r := mux.NewRouter()
	r.HandleFunc("/hello", handler.Test)
	http.Handle("/", r)
	fmt.Println(http.ListenAndServe(":8080", nil))
}
