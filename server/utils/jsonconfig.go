package utils

import (
	"io"
	"io/ioutil"
	"os"
	"path/filepath"

	log "github.com/sirupsen/logrus"
)

// Parser must implement ParseJSON
type Parser interface {
	ParseJSON([]byte) error
}

// Load the JSON config file
func LoadConfig(configFile string, p Parser) {
	var err error
	var absPath string
	var input = io.ReadCloser(os.Stdin)
	if absPath, err = filepath.Abs(configFile); err != nil {
		log.Error(err)
	}

	if input, err = os.Open(absPath); err != nil {
		log.Error(err)
	}

	// Read the config file
	jsonBytes, err := ioutil.ReadAll(input)
	input.Close()
	if err != nil {
		log.Error(err)
	}

	// Parse the config
	if err := p.ParseJSON(jsonBytes); err != nil {
		log.Error("Could not parse %q: %v", configFile, err)
	}
}
