package flow

import (
	"../client"
)

type Flow struct {
	cl client.Client
	baseURL string
}

type Params struct {
	name string
	flowType string
	descriptions string
	partners []string
}

func New(client client.Client) Flow {
	return Flow{cl: client, baseURL: "flows"}
}

func (m Flow) Create(p Params) interface{} {
	data := map[string]interface{}{
		"name": p.name,
		"flowType": p.flowType,
	}
	if p.descriptions != "" {
		data["descriptions"] = p.descriptions
	}
	if p.partners != nil {
		data["partners"] = p.partners
	}
	return m.cl.Create(m.baseURL + "/", data)
}

func (m Flow) Update(flowId string, p Params) interface{} {
	var (
		data = map[string]interface{}{}
	)
	if p.name != "" {
		data["name"] = p.name
	}
	if p.descriptions != "" {
		data["descriptions"] = p.descriptions
	}
	if p.partners != nil {
		data["partners"] = p.partners
	}
	return m.cl.Update(m.baseURL+"/"+flowId, data)
}

func (m Flow) Get(flowId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+flowId)
}

func (m Flow) Remove(flowId string) interface{} {
	removed := m.Get(flowId)
	m.cl.Delete(m.baseURL+"/"+flowId)
	return removed
}

func (m Flow) List() interface{} {
	return m.cl.Get(m.baseURL + "/")
}
