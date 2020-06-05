const OW = require('../../package')

const test = async () => {
  const apiCl = OW('VM4oeQcpt0SJcin1fi5v')

  // Create a flow
  // console.log(await apiCl.flow.create('flow_kent', 'TRACK_TRACE'))

  // Get a flow
  console.log(await apiCl.flow.get("FL0000002"))

  // Get all flow
  console.log(await apiCl.flow.list())

}


test()