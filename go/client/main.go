package openwater

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"time"
)

type openwater struct {
	url    string
	apikey string
	client *http.Client
}

// New open water
func New(apikey string) openwater {
	url := "http://consensus.us-east-2.elasticbeanstalk.com/"
	client := &http.Client{
		Timeout: time.Minute * 5,
	}
	ow := openwater{url, apikey, client}
	return ow
}

func auth(req *http.Request, apikey string) {
	if apikey != "" {
		req.Header.Set("Authorization", apikey)
	}
}

func setJSON(req *http.Request) {
	req.Header.Set("Content-type", "application/json")
}

func response(resp *http.Response) interface{} {
	var result map[string]interface{}
	return json.NewDecoder(resp.Body).Decode(result)
	return result
}

func (ow openwater) Create(url string, data interface{}) interface{} {
	url = ow.url + url

	body, err := json.Marshal(data)
	if err != nil {
		log.Fatalln(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, ow.apikey)
	setJSON(req)

	resp, err := ow.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}

	return response(resp)
}

func (ow openwater) Update(url string, data interface{}) interface{} {
	url = ow.url + url

	body, err := json.Marshal(data)
	if err != nil {
		log.Fatalln(err)
	}

	req, err := http.NewRequest("PUT", url, bytes.NewBuffer(body))
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, ow.apikey)
	setJSON(req)

	resp, err := ow.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

func (ow openwater) Get(url string) interface{} {
	url = ow.url + url

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, ow.apikey)
	setJSON(req)

	resp, err := ow.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

func (ow openwater) Delete(url string) interface{} {
	url = ow.url + url

	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, ow.apikey)
	setJSON(req)

	resp, err := ow.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

func (ow openwater) Upload(url string, filename string) interface{} {
	url = ow.url + url

	file, err := os.Open(filename)
	if err != nil {
		log.Fatalln(err)
	}

	defer file.Close()
	var requestBody bytes.Buffer
	multiPartWriter := multipart.NewWriter(&requestBody)

	fileWriter, err := multiPartWriter.CreateFormFile("file", filename)
	if err != nil {
		log.Fatalln(err)
	}

	_, err := io.Copy(fileWriter, file)
	if err != nil {
		log.Fatalln(err)
	}

	fieldWriter, err := multiPartWriter.CreateFormField("normal_field")
	if err != nil {
		log.Fatalln(err)
	}

	_, err := fieldWriter.Write([]byte("Value"))
	if err != nil {
		log.Fatalln(err)
	}

	multiPartWriter.Close()

	req, err := http.NewRequest("POST", url, &requestBody)
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, ow.apikey)
	req.Header.Set("Content-Type", multiPartWriter.FormDataContentType())

	resp, err := ow.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}
