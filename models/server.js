require('colors')
const express    = require('express')
const cors       = require('cors')
const fileUpload = require('express-fileupload') 

const { 
  dbConnection 
} = require('../database/configdb')

class Server {
 
  /*::::::::::::::::::::::::::::::[ Constructor ]::::::::::::::::::::::::::::::*/
  constructor() { 
    
    this.app      = express()                  //:::::::::::::[ EXPRESS SERVER ] 
    this.port     = process.env.PORT || 3500   //::::::[ VARIABLES DE AMBIENTE ] 

    this.paths = {
      auth          : '/api/auth' ,
      buscar        : "/api/buscar",
      categorias    : '/api/categorias',
      productos     : '/api/productos',
      usuarios      : '/api/usuarios',
      uploads       : '/api/uploads' 
    }
  
    //::::::::::::::::::::[ DB CONNECTION ]  
    this.conectarDB()

    //::::::::::::::::::::[ MIDDLEWARES ]  
    this.middlewares() 
  
    //::::::::::::::::::::[ RUTAS '../routes/usuarios.routes' DE MI APP ] 
    this.routes() 
    
  }

  /*::::::::::::::::::::::::::[ METODOS DE LA CLASE ]::::::::::::::::::::::::::*/
  async conectarDB () {
    await dbConnection() 
  }

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

    // FileUpload - Cargar archivos.
    this.app.use( fileUpload ({       
        useTempFiles     : true,
        tempFileDir      : 'tmp/',
        createParentPath : true, // Si la carpeta no existe la crea!
        fileSize         : 50 * 1024 * 1024,        
        abortOnLimit     : true,
        responseOnLimit  : "El tamaño del archivo excede lo permitido!",
        uploadTimeout    : 100000 
    }))

  }

  routes() { 
    // Middleware condicional para la ruta / 
    this.app.use( this.paths.auth       , require('../routes/auth.route') )    // BUSQUEDAS 
    this.app.use( this.paths.buscar     , require('../routes/buscar.route') ) 
    this.app.use( this.paths.categorias , require('../routes/categorias.route') ) 
    // Nueva Ruta PRODUCTOS
    this.app.use( this.paths.productos  , require('../routes/productos.route') ) 
    this.app.use( this.paths.usuarios   , require('../routes/usuarios.route') ) 
    this.app.use( this.paths.uploads    , require('../routes/uploads.route') ) 

    // Manejo de solicitudes no coincidentes del cliente
    this.app.use( (req, res, next) => { 
      console.console.log( `Ruta No encontrada ${req.params }` ) 
      res.status(404).send({ msg: "Ruta No encontrada" }) 
    }) 
  }  

  listen() { 
    /* --------------------------[ INICIO DE SERVER ]-------------------------- */
    this.app.listen( this.port, () => {  
      console.log( `\n\n\t======[ 208 ] "Nuevo despliegue a Railway" ======`.yellow.bold ) 
      console.log( `\n\n\tServidor (con CORS Habilitado) ejecutandose en el puerto [ ${ String( this.port ).yellow.bold } ] \n`.bgGreen.white )  
    } )
  } 

}

module.exports = Server 
