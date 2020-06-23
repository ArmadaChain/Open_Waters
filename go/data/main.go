package data

import (
	"../client"
	"strconv"
)

type Data struct {
	cl client.Client
	baseURL string
}

type Params struct {
	data interface{}
	memo string
}

func New(client client.Client) Data {
	return Data{cl: client, baseURL: "data"}
}

func (m Data) Push(flowId string, p Params, encrypt bool) interface{} {
	body := map[string]interface{}{
		"flowId": flowId,
		"data": p.data,
	}
	if p.memo != "" {
		body["memo"] = p.memo
	}
	return m.cl.Create(m.baseURL + "/?encrypt="+strconv.FormatBool(encrypt), body)
}

func (m Data) Get(flowId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+flowId)
}
