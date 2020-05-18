package document

import (
	"../client"
)

type Document struct {
	cl client.Client
	baseURL string
}

func New(client client.Client) Document {
	return Document{cl: client, baseURL: "documents"}
}

func (m Document) Upload(file string) interface{} {
	return m.cl.Upload(m.baseURL+"/upload", file)
}
