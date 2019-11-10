//Requires Armada Libary with key
const armada = require('./open-waters')('secretkey');

// Send data to Hedera Hashgraph
const post = armada.post.create({
	activityID: 1234,
	data: '{lat: 37.7749, long: 122.4194, id: 12}',
	memo: 'checking '

});