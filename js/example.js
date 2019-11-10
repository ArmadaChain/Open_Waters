//Requires Armada Libary with key
const armada = require('armada')('secret key');

// Send data to Hedera Hashgraph
const post = await armada.post.create({
	activityID: 1234,
	data: '{lat: 37.7749, long: 122.4194, id: 12}',
	memo: 'checking '

});