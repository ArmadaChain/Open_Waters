package _go

import (
	"./account"
	"./client"
	"./dataset"
	"./flow"
	"./step"
)

type withKey struct {
	Account account.Account
	DataSet dataset.DataSet
	Flow flow.Flow
	Step step.Step
}

type noKey struct {
	Account account.PublicAccount
}

func WithKey(apiKey string) withKey {
	var ow withKey
	client := client.New(apiKey)
	ow = withKey{
		Account: account.New(client),
		DataSet: dataset.New(client),
		Flow: flow.New(client),
		Step: step.New(client),
	}
	return ow
}

func NoKey() noKey {
	var ow noKey
	client := client.New("")
	ow = noKey{
		Account: account.NewPublic(client),
	}
	return ow
}
