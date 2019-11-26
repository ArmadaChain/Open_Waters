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

readline.question(`How many iterations: `, (tests) => {
  for (var i=0; tests, i<tests; i++)
	{
		var t0 = performance.now();
		request.post('http://3.132.236.222/data?apikey=XriiU6sm19UUCJwm15ky', {
		  json: {
		    "activityId": 123,
		    "data":"{OW TESTINGADSFJA DFsdf}",
		    "memo": "checking"
		  }
		}, (error, res, body) => {
		  if (error) {
		    console.error(error)
		    return
		  }

		  if(res.statusCode == 500 )
		  {
		  	fail++;
		  	console.log("still running... "+ "FAILED " + trial+"/"+tests);
		  }
		  else{
		  	console.log("still running... "+ trial+"/"+tests);
		  }

		  var t1 = performance.now();
		  trial++;
		  sleep.sleep(2);
		  if(trial == tests)
			{
				console.log("Results: " + (trial - fail) + " passed out of " + trial);
			}
		})
		
	}
  readline.close()
})