package _go

import (
	"./account"
	"./client"
	"./dataset"
	"./document"
	"./flow"
	"./step"
)

type withKey struct {
	Account account.Account
	DataSet dataset.DataSet
	Flow flow.Flow
	Step step.Step
	Document document.Document
}

type noKey struct {
	Account account.PublicAccount
}

func _(apiKey string) withKey {
	var ow withKey
	cl := client.New(apiKey)
	ow = withKey{
		Account: account.New(cl),
		DataSet: dataset.New(cl),
		Flow: flow.New(cl),
		Step: step.New(cl),
		Document: document.New(cl),
	}
	return ow
}

func _() noKey {
	var ow noKey
	var (
		cl = client.New("")
	)
	ow = noKey{
		Account: account.NewPublic(cl),
	}
	return ow
}
