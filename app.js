const Server = require('./models/server')
require('dotenv').config() 

// Instancia del server 
const server = new Server()
// Invocamos el server 
server.listen() 