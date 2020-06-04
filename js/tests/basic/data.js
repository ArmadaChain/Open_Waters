const OW = require('../../package')

const test = async () => {
  const apiCl = OW('WmKM7K5euWyqejiADCU0')

  // Push data
  // console.log(await apiCl.data.push("FL0000001", {"oanh":"test"}, "oanh test"), false)

  // Get data
  console.log(await apiCl.data.get("FL0000001"))

}


test()