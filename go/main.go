package openwater

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type openwater struct {
	url string
}

func New(apikey string) openwater {
	url := "https://proxy-server.com:443/armadachain/openwater?apikey=" + apikey
	ow := openwater{url}
	return ow
}

func (ow openwater) Create(data interface{}) int {
	body, err := json.Marshal(data)
	if err != nil {
		log.Fatalln(err)
	}

	resp, err := http.Post(ow.url, "application/json", bytes.NewBuffer(body))
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	return resp.StatusCode
}

func (ow openwater) Get(queries map[string]interface{}) interface{} {

	resp, err := http.Get(ow.url)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	return body
}
