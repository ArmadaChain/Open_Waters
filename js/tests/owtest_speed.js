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
  var t11 = performance.now();
  for (var i=0; tests, i<tests; i++)
	{
<<<<<<< HEAD
		// var t0 = performance.now();
		request.post('http://awseb-e-v-AWSEBLoa-1O1AIXZPQ2AP3-1256927148.us-east-2.elb.amazonaws.com ', { //new backend used
=======
		var t0 = performance.now();
		request.post('http://awseb-e-v-AWSEBLoa-1O1AIXZPQ2AP3-1256927148.us-east-2.elb.amazonaws.com/data?apikey=XriiU6sm19UUCJwm15ky', {
>>>>>>> ab04a847772a0536b7780ff7e1dc48eee1fbb8e6
		  json: {
		    "activityId": 123,
		    "data":"{Checking issues }",
		    "memo": "checking"
		  }
		}, (error, res, body) => {
		  if (error) {
		    console.error(error)
		    return
		  }

		  // if(res.statusCode == 500 )
		  // {
		  // 	fail++;
		  // 	console.log("still running... "+ "FAILED " + trial+"/"+tests);
		  // }
		  // else{
		  // 	console.log("still running... "+ trial+"/"+tests);
		  // }

		  // var t1 = performance.now();
		  trial++;
		  // sleep.sleep(2);
		  if(trial == tests)
			{
				// console.log("Results: " + (trial - fail) + " passed out of " + trial);
				var t12 = performance.now();
				console.log("speed ="+ (t12-t11) + "finished");
			}
		})
		
	}


  readline.close()
})