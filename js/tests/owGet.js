const request = require('request')

request('http://awseb-e-v-AWSEBLoa-1O1AIXZPQ2AP3-1256927148.us-east-2.elb.amazonaws.com/data?apikey=XriiU6sm19UUCJwm15ky&activityId=123', function(err, res, body){
	console.log(body);
});
