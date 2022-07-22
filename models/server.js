require('colors')
const express = require('express') 
const cors    = require('cors') 

class Server {

  /*::::::::::::::::::::::::::::::[ Constructor ]::::::::::::::::::::::::::::::*/
  constructor() { 
    
    this.app      = express()                //:::::::::::::[ EXPRESS SERVER ] 
    this.port     = process.env.PORT || 3500 //::::::[ VARIABLES DE AMBIENTE ] 
    this.userPath = '/api/usuarios'  

    //::::::::::::::::::::[ MIDDLEWARES ]  
    this.middlewares() 

    //::::::::::::::::::::[ RUTAS DE MI APP ]
    this.routes() 
    
  }

  /*::::::::::::::::::::::::::[ METODOS DE LA CLASE ]::::::::::::::::::::::::::*/

  middlewares() {
    /* CORS */
    this.app.use( cors() ) 

    /* Lectura y Parseo del body a formato JSON */
    this.app.use( express.json() ) 

    /* -------[ Servimos los estaticos de la carpeta 'public/' ]------ */    
    this.app.use( express.static('public') ) // Servimos los estaticos de la carpeta 'public/' 
    /* 
      --------------------------------------[ ATENCION ]----------------------------------
      Al meter el middleware , la ruta '/' ya no sirve! 
      por que antes se ejecutara la funcion middleware que esta sirviendo los estaticos 
      en la carpeta 'public/' y ahi tenemos el archivo index.html el cual sera servido 
      en el lugar de lo que se configure en la ruta '/' 
      ------------------------------------------------------------------------------------ 
    */ 

  }

  routes() { 
    // Middleware condicional para la ruta / 
    this.app.use( this.userPath, require('../routes/usuarios.routes') )  
  }

  listen() {
    /* --------------------------[ INICIO DE SERVER ]-------------------------- */
    this.app.listen( this.port, () => {  
      console.log( `\n\n\tServidor (con CORS Habilitado) ejecutandose en el puerto [ ${ String( this.port ).yellow.bold } ] \n`.bgGreen.white ) 
    } )
  }

}


module.exports = Server 