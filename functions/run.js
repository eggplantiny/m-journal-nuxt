const app = require('./express')()
const http = require('http')

//Create HTTP server and listen on port 8000 for requests
http.createServer(app).listen(8000)
