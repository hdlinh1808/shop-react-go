package main

import (
	"net/http"

	"github.com/hdlinh1808/go-blog/model"

	"github.com/hdlinh1808/go-blog/db/mongodb"
	"github.com/hdlinh1808/go-blog/log"
	"github.com/hdlinh1808/go-blog/route"
)

func main() {
	log.InitLog()
	mongodb.Init()
	model.InitData()
	http.Handle("/", route.Routes())

	log.Info("starting server...")
	error := http.ListenAndServe(":8080", nil)
	if error != nil {
		log.Info("Server start fail!")
		log.Error(error.Error())
	}

	// var a = new(TestA)
	// a.a.b = 2
	// test(a)
	// fmt.Print(a)
}

func test(a *TestA) {
	a.a.b = 1
}

type TestA struct {
	a TestB
}

type TestB struct {
	b int
}
