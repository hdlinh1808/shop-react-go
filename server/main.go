package main

import (
	"net/http"

	"github.com/hdlinh1808/go-shop/db/mongodb"
	"github.com/hdlinh1808/go-shop/log"
	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/route"
	"github.com/sirupsen/logrus"
)

func main() {

	log.InitLog()
	mongodb.Init()
	model.InitData()

	http.Handle("/", route.Routes())

	logrus.Info("start server...")
	error := http.ListenAndServe(":8080", nil)
	if error != nil {
		logrus.Info("Server start fail!")
		logrus.Error(error.Error())
	}
}
