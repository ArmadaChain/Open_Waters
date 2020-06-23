package account

import (
	"../client"
)

type Account struct {
	cl client.Client
	baseURL string
}

type PublicAccount struct {
	cl client.Client
	baseURL string
}

type Params struct {
	username string
	email string
	name string
	company string
}

func New(client client.Client) Account {
	return Account{cl: client, baseURL: "customers"}
}

func NewPublic(client client.Client) PublicAccount {
	return PublicAccount{cl: client, baseURL: "customers"}
}

func (m Account) Create(p Params) interface{} {
	data := map[string]interface{}{
		"username": p.username,
		"email": p.email,
	}
	if p.name != "" {
		data["name"] = p.name
	}
	if p.company != "" {
		data["company"] = p.company
	}

	return m.cl.Create(m.baseURL + "/", data)
}

func (pc PublicAccount) Create(p Params) interface{} {
	data := map[string]interface{}{
		"username": p.username,
		"email": p.email,
	}
	if p.name != "" {
		data["name"] = p.name
	}
	if p.company != "" {
		data["company"] = p.company
	}

	return pc.cl.Create(pc.baseURL + "/", data)
}

func (m Account) Update(accountId string, p Params) interface{} {
	data := map[string]interface{}{}
	if p.email != "" {
		data["email"] = p.email
	}
	if p.name != "" {
		data["name"] = p.name
	}
	if p.company != "" {
		data["company"] = p.company
	}

	return m.cl.Update(m.baseURL+"/"+accountId, data)
}

func (m Account) Get(accountId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+accountId)
}

