package client

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

type Client struct {
	url    string
	apiKey string
	client *http.Client
}

func New(apiKey string) Client {
	url := "http://consensus.us-east-2.elasticbeanstalk.com/api/v1/"
	cl := &http.Client{
		Timeout: time.Minute * 5,
	}
	clt := Client{url, apiKey, cl}
	return clt
}

func auth(req *http.Request, key string) {
	if key != "" {
		req.Header.Set("Authorization", key)
	}
}

func setJSON(req *http.Request) {
	req.Header.Set("Content-type", "application/json")
}

func response(resp *http.Response) interface{} {
	var result map[string]interface{}
	return json.NewDecoder(resp.Body).Decode(&result)
}

func (clt Client) Create(url string, data interface{}) interface{} {
	url = clt.url + url

	body, err := json.Marshal(data)
	if err != nil {
		log.Fatalln(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, clt.apiKey)
	setJSON(req)

	resp, err := clt.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}

	return response(resp)
}

func (clt Client) Update(url string, data interface{}) interface{} {
	url = clt.url + url

	body, err := json.Marshal(data)
	if err != nil {
		log.Fatalln(err)
	}

	req, err := http.NewRequest("PUT", url, bytes.NewBuffer(body))
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, clt.apiKey)
	setJSON(req)

	resp, err := clt.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

func (clt Client) UpdateNoBody(url string) interface{} {
	url = clt.url + url

	req, err := http.NewRequest("PUT", url, nil)
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, clt.apiKey)
	setJSON(req)

	resp, err := clt.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

func (clt Client) Get(url string) interface{} {
	url = clt.url + url

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, clt.apiKey)
	setJSON(req)

	resp, err := clt.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

func (clt Client) Delete(url string) interface{} {
	url = clt.url + url

	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, clt.apiKey)
	setJSON(req)

	resp, err := clt.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

func (clt Client) Upload(url string, filename string) interface{} {
	url = clt.url + url

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

	_, err = io.Copy(fileWriter, file)
	if err != nil {
		log.Fatalln(err)
	}

	fieldWriter, err := multiPartWriter.CreateFormField("normal_field")
	if err != nil {
		log.Fatalln(err)
	}

	_, err = fieldWriter.Write([]byte("Value"))
	if err != nil {
		log.Fatalln(err)
	}

	_ = multiPartWriter.Close()

	req, err := http.NewRequest("POST", url, &requestBody)
	if err != nil {
		log.Fatalln(err)
	}
	auth(req, clt.apiKey)
	req.Header.Set("Content-Type", multiPartWriter.FormDataContentType())

	resp, err := clt.client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	return response(resp)
}

