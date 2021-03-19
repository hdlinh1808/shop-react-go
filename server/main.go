package main

import (
	"fmt"
	"net/http"
	"os"
	"runtime/debug"

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

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Unhandle error!")
			fmt.Printf("Panic: %v,\n%s", r, debug.Stack())
			os.Exit(1)
		}
	}()
	error := http.ListenAndServe(":8080", nil)
	if error != nil {
		log.Info("Server start fail!")
		log.Error(error.Error())
	}
}
