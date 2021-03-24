package main

import (
	"encoding/json"
	"net/http"

	"github.com/hdlinh1808/go-shop/db/mongodb"
	"github.com/hdlinh1808/go-shop/log"
	"github.com/hdlinh1808/go-shop/model"
	"github.com/hdlinh1808/go-shop/route"
	"github.com/hdlinh1808/go-shop/session"
	"github.com/hdlinh1808/go-shop/utils"
	"github.com/sirupsen/logrus"
)

// Config struct
type config struct {
	Session session.Session `json:"Session"`
}

func (c *config) ParseJSON(b []byte) error {
	return json.Unmarshal(b, &c)
}

var c = &config{}

func main() {
	utils.LoadConfig("config/config.json", c)

	// Configure the session cookie store
	session.Configure(c.Session)

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
