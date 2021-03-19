package log

import (
	"fmt"
	"io"
	"os"
	"runtime"
	"strings"

	"github.com/sirupsen/logrus"
)

var _log = logrus.New()
var _logErr = logrus.New()

//InitLog func
func InitLog() {
	// _log.SetLevel(logrus.InfoLevel)
	initLog(_log, "app.log")

	// _logErr.SetLevel(logrus.ErrorLevel)
	initLog(_logErr, "app.error.log")
}

func initLog(log *logrus.Logger, filename string) {
	// log.SetReportCaller(true)
	log.SetFormatter(&logrus.JSONFormatter{
		PrettyPrint: false,
		CallerPrettyfier: func(f *runtime.Frame) (string, string) {
			repopath := fmt.Sprintf("%sserver/log", os.Getenv("GOPATH"))
			filename := strings.Replace(f.File, repopath, "", -1)
			// println(repopath)
			// println(f.Function)
			return fmt.Sprintf("%s()", f.Function), fmt.Sprintf("%s:%d", filename, f.Line)
		},
	})

	log.Out = os.Stdout
	file, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)

	if err == nil {
		mw := io.MultiWriter(os.Stdout, file)
		log.Out = mw
	} else {
		_log.Info("Failed to log to file, using default stderr")
	}
}

// Info func
func Info(msg string) {
	_log.Info(msg)
}

// Error func
func Error(msg string) {
	_logErr.Error(msg)
}
