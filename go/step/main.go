package step

import (
	"../client"
	"strconv"
)

type Step struct {
	cl client.Client
	baseURL string
}

type Params struct {
	stepNum int
	validator string
	flow string
	documents []string
	dataSet string
	data interface{}
}

func New(client client.Client) Step {
	return Step{cl: client, baseURL: "steps"}
}

func (m Step) Create(p Params) interface{} {
	step := map[string]interface{}{
		"stepNum": p.stepNum,
		"validator": p.validator,
		"flow": p.flow,
	}
	if p.documents != nil {
		step["documents"] = p.documents
	}
	if p.dataSet != "" {
		step["dataSet"] = p.dataSet
	}
	if p.data != nil {
		step["data"] = p.data
	}
	return m.cl.Create(m.baseURL + "/", step)
}

func (m Step) Update(stepId string, p Params) interface{} {
	step := map[string]interface{}{}
	if p.stepNum >= 0 {
		step["stepNum"] = p.stepNum
	}
	if p.validator != "" {
		step["validator"] = p.validator
	}
	if p.flow != "" {
		step["flow"] = p.flow
	}
	if p.documents != nil {
		step["documents"] = p.documents
	}
	if p.dataSet != "" {
		step["dataSet"] = p.dataSet
	}
	if p.data != nil {
		step["data"] = p.data
	}
	return m.cl.Update(m.baseURL+"/"+stepId, step)
}

func (m Step) Validate(stepId string, isCompleted bool) interface{} {
	return m.cl.UpdateNoBody(m.baseURL+"/"+stepId+"/validate/"+strconv.FormatBool(isCompleted))
}

func (m Step) Get(stepId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+stepId)
}

func (m Step) Remove(stepId string) interface{} {
	removed := m.Get(stepId)
	m.cl.Delete(m.baseURL+"/"+stepId)
	return removed
}

func (m Step) ListByFlow(flowId string, validator string) interface{} {
	var queries string
	if validator != "" {
		queries = "&validator="+validator
	}
	return m.cl.Get("flows/"+flowId+"/"+m.baseURL+"/"+queries)
}
