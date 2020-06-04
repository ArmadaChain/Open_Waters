const request = require('request')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var message;

readline.question(`Message: `, (message) => {
	request.post('http://awseb-e-v-AWSEBLoa-1O1AIXZPQ2AP3-1256927148.us-east-2.elb.amazonaws.com/data?apikey=XriiU6sm19UUCJwm15ky', {
	// request.post('http://localhost:8080/data?apikey=XriiU6sm19UUCJwm15ky', { //If local host run on 8080
		json: {
		    "activityId": 123,
		    "data": message,
		    "memo": "checking"
		  }
		}, (error, res, body) => {
		  if (error) {
		    console.error(error)
		    return
		  }
		})
  readline.close()
})