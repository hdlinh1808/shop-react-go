package main

import (
	"fmt"
	"net/http"

	"github.com/hdlinh1808/go-blog/db/mongodb"
	"github.com/hdlinh1808/go-blog/route"
)

func main() {
	mongodb.Init()
	http.Handle("/", route.Routes())
	fmt.Println(http.ListenAndServe(":8080", nil))
}
