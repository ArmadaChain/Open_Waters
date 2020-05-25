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

func New(client client.Client) Account {
	return Account{cl: client, baseURL: "customers"}
}

func NewPublic(client client.Client) PublicAccount {
	return PublicAccount{cl: client, baseURL: "customers"}
}

func (m Account) Create(username string, email string, name string, company string) interface{} {
	data := map[string]interface{}{
		username: username,
		email: email,
	}
	if name != "" {
		data["name"] = name
	}
	if company != "" {
		data["company"] = company
	}

	return m.cl.Create("public/"+m.baseURL, data)
}

func (p PublicAccount) Create(username string, email string, name string, company string) interface{} {
	data := map[string]interface{}{
		username: username,
		email: email,
	}
	if name != "" {
		data["name"] = name
	}
	if company != "" {
		data["company"] = company
	}

	return p.cl.Create("public/"+p.baseURL, data)
}

func (m Account) Update(accountId string, email string, name string, company string) interface{} {
	data := map[string]interface{}{}
	if email != "" {
		data["email"] = email
	}
	if name != "" {
		data["name"] = name
	}
	if company != "" {
		data["company"] = company
	}

	return m.cl.Update(m.baseURL+"/"+accountId, data)
}

func (m Account) Get(accountId string) interface{} {
	return m.cl.Get(m.baseURL+"/"+accountId)
}

func (m Account) Delete(accountId string) interface{} {
	return m.cl.Delete(m.baseURL+"/"+accountId)
}

