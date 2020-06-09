module.exports = {
  log: {
    dir: "logs",
    filename: process.env.LOG_FILE_NAME || "events.log",
    size: process.env.LOG_FILE_SIZE || 10485760,
    level: process.env.LOG_LEVEL || "debug"
  },
  acc: {
    normal: {
      id: "CU0000003",
      key: "VM4oeQcpt0SJcin1fi5v"
    }
  }
}