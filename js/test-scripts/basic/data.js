const OW = require('../../package')

const test = async () => {
  const apiCl = OW('VM4oeQcpt0SJcin1fi5v')

  // Push data
  console.log(await apiCl.data.push("FL0000002", {"kent":"test"}, "kent test"), false)

  // Get data
  console.log(await apiCl.data.get("FL0000002"))

}


test()