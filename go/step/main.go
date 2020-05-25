package step

import (
	"../client"
)

type Step struct {
	cl client.Client
	baseURL string
}

func New(client client.Client) Step {
	return Step{cl: client, baseURL: "steps"}
}

func (m Step) Create(stepNum int, validator string, flow string, documents []string, dataSet string,
		data interface{}) interface{} {
	step := map[string]interface{}{
		"stepNum": stepNum,
		"validator": validator,
		"flow": flow,
	}
	if documents != nil {
		step["documents"] = documents
	}
	if dataSet != "" {
		step["dataSet"] = dataSet
	}
	if data != nil {
		step["data"] = data
	}
	return m.cl.Create(m.baseURL, data)
}

func (m Step) Update(stepId string, stepNum int, validator string, flow string, documents []string,
	dataSet string, data interface{}) interface{} {
	step := map[string]interface{}{}
	if stepNum >= 0 {
		step["stepNum"] = stepNum
	}
	if validator != "" {
		step["validator"] = validator
	}
	if flow != "" {
		step["flow"] = flow
	}
	if documents != nil {
		step["documents"] = documents
	}
	if dataSet != "" {
		step["dataSet"] = dataSet
	}
	if data != nil {
		step["data"] = data
	}
	return m.cl.Update(m.baseURL+"/"+stepId, data)
}

func (m Step) Validate(stepId string, isCompleted bool) interface{} {
	return m.cl.Update(m.baseURL+"/"+stepId+"/validate/"+isCompleted)
}

func (m Step) Get(stepId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+stepId)
}

func (m Step) Delete(stepId string) interface{} {
	return m.cl.Delete(m.baseURL+"/"+stepId)
}

func (m Step) ListByFlow(flowId string, validator string) interface{} {
	var queries string
	if validator != "" {
		queries = "&validator="+validator
	}
	return m.cl.Get("flows/"+flowId+"/"+m.baseURL+queries)
}
