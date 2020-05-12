package dataset

import (
	"../client"
)

type DataSet struct {
	cl client.Client
	baseURL string
}

type KeysAndTypes struct {
	FieldKey string
	FieldType string
}

func New(client client.Client) DataSet {
	return DataSet{cl: client, baseURL: "datasets"}
}

func (m DataSet) Create(name string, kAndT ...KeysAndTypes) interface{} {
	var keys []string
	var types []string
	for _, e := range kAndT {
		keys = append(keys, e.FieldKey)
		types = append(types, e.FieldType)
	}
	data := map[string]interface{}{
		"fieldKeys": keys,
		"fieldTypes": types,
		"name": name,
	}
	return m.cl.Create(m.baseURL, data)
}

func (m DataSet) Update(dataSetId string, name string, kAndT ...KeysAndTypes) interface{} {
	data := map[string]interface{}{}
	if name != "" {
		data["name"] = name
	}
	if kAndT != nil {
		var keys []string
		var types []string
		for _, e := range kAndT {
			keys = append(keys, e.FieldKey)
			types = append(types, e.FieldType)
		}
		data["fieldKeys"] = keys
		data["fieldTypes"] = types
	}
	return m.cl.Update(m.baseURL+"/"+dataSetId, data)
}

func (m DataSet) Get(dataSetId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+dataSetId)
}

func (m DataSet) Delete(dataSetId string) interface{} {
	return m.cl.Delete(m.baseURL+"/"+dataSetId)
}

func (m DataSet) List() interface{} {
	return m.cl.Get(m.baseURL)
}
