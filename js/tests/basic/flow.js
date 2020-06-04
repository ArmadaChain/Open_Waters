const OW = require('../../package')

const test = async () => {
  const apiCl = OW('WmKM7K5euWyqejiADCU0')

  // Create a flow
  // console.log(await apiCl.flow.create('flow1', 'TRACK_TRACE'))

  // Get a flow
  console.log(await apiCl.flow.get("FL0000001"))

  // Get all flow
  console.log(await apiCl.flow.list())

}


test()