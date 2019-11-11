//Requires Armada Libary with key
const armada = require('open-waters')('XriiU6sm19UUCJwm15ky');

async function test() {
	// Send data to Hedera Hashgraph
	// try {
	// 	await armada.post.create({
	// 		activityId: 123,
	// 		data: '{lat: 37.7749, long: 122.4194, id: 12}',
	// 		memo: 'checking '
	// 	})
	// } catch (error) {
	// 	console.log(error)
	// }

	let result
	try {
		result = await armada.post.get({
			activityId: 123
		})
	} catch (error) {
		result = error
	}
	
	console.log(result.response.data)
}

test()