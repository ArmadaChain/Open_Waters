package flow

import (
	"../client"
)

type Flow struct {
	cl client.Client
	baseURL string
}

func New(client client.Client) Flow {
	return Flow{cl: client, baseURL: "flows"}
}

func (m Flow) Create(name string, flowType string, descriptions string, partners []string) interface{} {
	data := map[string]interface{}{
		"name": name,
		"flowType": flowType,
	}
	if descriptions != "" {
		data["descriptions"] = descriptions
	}
	if partners != nil {
		data["partners"] = partners
	}
	return m.cl.Create(m.baseURL, data)
}

func (m Flow) Update(flowId string, name string, descriptions string, partners []string) interface{} {
	data := map[string]interface{}{}
	if name != "" {
		data["name"] = name
	}
	if descriptions != "" {
		data["descriptions"] = descriptions
	}
	if partners != nil {
		data["partners"] = partners
	}
	return m.cl.Update(m.baseURL+"/"+flowId, data)
}

func (m Flow) Get(flowId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+flowId)
}

func (m Flow) Delete(flowId string) interface{} {
	return m.cl.Delete(m.baseURL+"/"+flowId)
}

func (m Flow) List() interface{} {
	return m.cl.Get(m.baseURL)
}
