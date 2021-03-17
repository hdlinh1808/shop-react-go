package main

import (
	"net/http"

	"github.com/hdlinh1808/go-blog/db/mongodb"
	"github.com/hdlinh1808/go-blog/log"
	"github.com/hdlinh1808/go-blog/route"
)

func main() {
	log.InitLog()
	mongodb.Init()
	http.Handle("/", route.Routes())

	log.Info("starting server...")
	error := http.ListenAndServe(":8080", nil)
	if error != nil {
		log.Info("Server start fail!")
		log.Error(error.Error())
	}
}
