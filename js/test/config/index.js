module.exports = {
  server: {
    endpoint: process.env.SERVER_ENDPOINT || 'http://localhost:8080/api/v1'
  },
  db: {
    uri: process.env.DB_URI || '',
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || '1111',
    dbTesting: process.env.DB_NAME || 'automation-testing',
  },
  log: {
    dir: "logs",
    filename: process.env.LOG_FILE_NAME || "events.log",
    size: process.env.LOG_FILE_SIZE || 10485760,
    level: process.env.LOG_LEVEL || "debug"
  },
  apikey: {
    normal: "JWT-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    admin: "JWT-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  }
}