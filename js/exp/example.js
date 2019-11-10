//Requires Armada Libary with key
const armada = require('open-waters')('secretkey');

async function test() {
	// Send data to Hedera Hashgraph
	let result
	try {
		result = await armada.post.create({
			activityID: 1234,
			data: '{lat: 37.7749, long: 122.4194, id: 12}',
			memo: 'checking '
		})
	} catch (error) {
		result = error
	}

	console.log(result)
}

test()