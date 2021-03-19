package main

import (
	"net/http"

	"github.com/hdlinh1808/go-blog/db/mongodb"
	"github.com/hdlinh1808/go-blog/log"
	"github.com/hdlinh1808/go-blog/model"
	"github.com/hdlinh1808/go-blog/route"
	"github.com/sirupsen/logrus"
)

func main() {
	log.InitLog()
	mongodb.Init()
	model.InitData()
	http.Handle("/", route.Routes())
	// defer func() {
	// 	if r := recover(); r != nil {
	// 		fmt.Println("Unhandle error!")
	// 		fmt.Printf("Panic: %v,\n%s", r, debug.Stack())
	// 		os.Exit(1)
	// 	}
	// }()
	logrus.Info("start server...")
	error := http.ListenAndServe(":8080", nil)
	if error != nil {
		logrus.Info("Server start fail!")
		logrus.Error(error.Error())
	}
}
