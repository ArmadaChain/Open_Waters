const request = require('request')
const { PerformanceObserver, performance } = require('perf_hooks');

var trial = 0;
var fail = 0;
var sleep = require('sleep');
var tests = 0;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`How many transactions: `, (tests) => {
  var t11 = performance.now();
  for (var i=0; tests, i<tests; i++)
	{
		var t0 = performance.now();
		// request.post('http://awseb-e-v-AWSEBLoa-1O1AIXZPQ2AP3-1256927148.us-east-2.elb.amazonaws.com/data?apikey=XriiU6sm19UUCJwm15ky', {
		request.post('http://localhost:8080/data?apikey=XriiU6sm19UUCJwm15ky', {

		  json: {
		    "activityId": 123,
		    "data":"Break the record",
		    "memo": "Open Waters Testing"
		  }
		}, (error, res, body) => {
		  if (error) {
		    console.error(error)
		    return
		  }
		  trial++;
		  if(trial == tests)
			{
				var t12 = performance.now();
				console.log("speed ="+ (t12-t11) + "finished");
			}
		})
		
	}


  readline.close()
})