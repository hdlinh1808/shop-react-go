package log

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"runtime"
	"syscall"

	"github.com/sirupsen/logrus"
	log "github.com/sirupsen/logrus"
)

// WriterHook is a hook that writes logs of specified LogLevels to specified Writer
type WriterHook struct {
	Writer    io.Writer
	LogLevels []log.Level
}

// Fire will be called when some logging function is called with current hook
// It will format log entry to string and write it to appropriate writer
func (hook *WriterHook) Fire(entry *log.Entry) error {
	line, err := entry.String()
	if err != nil {
		return err
	}
	_, err = hook.Writer.Write([]byte(line))
	return err
}

// Levels define on which log levels this hook would trigger
func (hook *WriterHook) Levels() []log.Level {
	return hook.LogLevels
}

func redirectStderr(f *os.File) {
	err := syscall.Dup2(int(f.Fd()), int(os.Stderr.Fd()))
	if err != nil {
		logrus.Panic("error")
	}
}

//InitLog func
func InitLog() {
	file, _ := os.OpenFile("app.exception.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	// redirectStderr(file)

	log.SetOutput(ioutil.Discard)
	log.SetReportCaller(true)
	log.SetFormatter(&logrus.TextFormatter{
		// PrettyPrint: false,
		DisableQuote: true,
		CallerPrettyfier: func(f *runtime.Frame) (string, string) {
			// repopath := fmt.Sprintf("%sserver/log", os.Getenv("GOPATH"))
			// filename := strings.Replace(f.File, repopath, "", -1)
			return fmt.Sprintf("%s:%d", f.Function, f.Line), ""
		},
	})
	file, err := os.OpenFile("app.error.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err == nil {
		log.AddHook(
			&WriterHook{ // Send logs with level higher than warning to stderr
				Writer: io.MultiWriter(os.Stdout, file),
				LogLevels: []log.Level{
					log.PanicLevel,
					log.FatalLevel,
					log.ErrorLevel,
					log.WarnLevel,
				},
			})
	}

	file, err = os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err == nil {
		log.AddHook(&WriterHook{ // Send info and debug logs to stdout
			Writer: io.MultiWriter(os.Stdout, file),
			LogLevels: []log.Level{
				log.InfoLevel,
				log.DebugLevel,
			},
		})
	}
}
