/* ----------------------[ IMPORTS - NODE IMPORTS FIRST ]--------------------- */
const path    = require('path')
const fs      = require('fs')

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL ) // 

/* ----------------------[ IMPORTS - DEVELOPER SECOND ]---------------------- */ 
const { response }            = require("express")
const { subirArchivo }        = require("../helpers/subir-archivo")

const { Usuario, Producto }   = require("../models")

/* -------------------[ UPLOAD CONTROLLER ]------------------- */ 
const cargarArchivo = async ( req, res=response ) => {  
 
  try { 

    // .txt , .md 
    // Cuando pasamos el 2do argumento de las extensiones permitidas, reemplazamos las
    // que estan por default en el helper, asi cada que se instancia podemos usar 
    // la utileria para permitir un solo tipo de extension(es).
    /* const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' )  */

    // Creamos la carpeta /imgs/ para la imagen que subiremos. 
    const nombre = await subirArchivo( req.files, undefined, 'imgs' )  
    res.status(200).json({ nombre }) 

  } catch ( error ) { res.status(400).json({ error }) } 

}   

/* ---------------[ CONTROLLER para Actualizar archivos imagenes ]-------------- */
const actualizarImagen = async ( req, res=response ) => { 

  const { id, coleccion } = req.params 

  let modelo 

  switch ( coleccion ) { 
    case 'usuarios': 
      modelo = await Usuario.findById( id ) 
      if ( !modelo ) { 
        return res.status(400).json({ 
          msg : `No existe un usuario con id [${id}]` 
        }) 
      } 

    break

    case 'productos' : 
      modelo = await Producto.findById( id ) 
      if ( !modelo ) { 
        return res.status(400).json({ 
          msg : `No existe un producto con id [${id}]` 
        })
      }
    break

    default:
      return res.status(500).json({ 
        msg : 'Se me olvido validar esto!' 
      })
  }
 
  /* Limpiar imagenes previas. */
  if ( modelo.img ) {
    const pathImg = path.join( __dirname, '../uploads/', coleccion, modelo.img ) 
    
    // Si existe hay que borrar la imagen del server.
    if ( fs.existsSync( pathImg ) ) { 
      console.log("\npathImg: %s\n", pathImg) 
      fs.unlinkSync( pathImg ) // Borramos el archivo 
    } 
  
  }

  const nombre = await subirArchivo( req.files, undefined, coleccion ) 
  modelo.img  = nombre  

  await modelo.save()  

  console.log( modelo )
  res.status(200).json( modelo )  
} 

const actualizarImagenCloudinary = async ( req, res=response ) => { 

  const { id, coleccion } = req.params 

  let modelo 

  switch ( coleccion ) { 
    case 'usuarios': 
      modelo = await Usuario.findById( id ) 
      if ( !modelo ) { 
        return res.status(400).json({ 
          msg : `No existe un usuario con id [${id}]` 
        }) 
      } 

    break

    case 'productos' : 
      modelo = await Producto.findById( id ) 
      if ( !modelo ) { 
        return res.status(400).json({ 
          msg : `No existe un producto con id [${id}]` 
        })
      }
    break

    default:
      return res.status(500).json({ 
        msg : 'Se me olvido validar esto!' 
      })
  }

  if ( modelo.img ) { 
    // TODO: Si existe la imagen en nuestro modelo debemos 
    //       de eliminarla de cloudinary.  
    const nombreArr     = modelo.img.split( '/' ) 
    const nombre        = nombreArr[ nombreArr.length - 1 ] 
    const [ public_id ] = nombre.split('.') 

    // BORRAMOS EN CLOUDINARY -  Limpiar imagenes previas. 
    await cloudinary.uploader.destroy( public_id ) 
  }

  const { tempFilePath } = req.files.archivo  
  // Subimos archivo a Cloudinary 
  const resp = await cloudinary.uploader.upload( tempFilePath ) 
  const { secure_url }  = resp 
  modelo.img            = secure_url 
  await modelo.save() 
  res.status(200).json( modelo )  
} 


const mostrarImgaen = async ( req, res=response ) => { 
  //bajamos los argumentos 
  const { coleccion, id }  = req.params 

  let modelo 

  switch ( coleccion ) { 
    case 'usuarios': 
      modelo = await Usuario.findById( id )  
      if ( !modelo ) { 
        return res.status(400).json({ 
          msg : `No existe un usuario con id [${id}]` 
        }) 
      } 

    break

    case 'productos' : 
      modelo = await Producto.findById( id ) 
      if ( !modelo ) { 
        return res.status(400).json({ 
          msg : `No existe un producto con id [${id}]` 
        })
      }
    break

    default:
      return res.status(500).json({ 
        msg : 'Se me olvido validar esto!' 
      })
  }
 
  /* Limpiar imagenes previas. */
  if ( modelo.img ) { 
    const pathImg = path.join( __dirname, '../uploads/', coleccion, modelo.img ) 
    // Si existe mostramos la imagen 
    if ( fs.existsSync( pathImg ) ) { 
      console.log("\npathImg: %s\n", pathImg)  
      return res.sendFile( pathImg )
    } 
   
  }  

  // Cuando el modelo no tenga la propiedad img 
  /* res.status(200).json({ msg: 'falta placeholder ' })  */
  
  const pathImagen =  path.join( __dirname, '../assets/no-image.jpg' ) 
  res.sendFile(pathImagen) 

}  

/* ------------------------[ EXPORTS ]----------------------- */
module.exports = { 
  cargarArchivo,  
  actualizarImagen, 
  mostrarImgaen, 
  actualizarImagenCloudinary
}  
