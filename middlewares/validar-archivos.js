const { response } = require("express")

const validar_ArchivoSubir = ( req, res = response, next ) => { 
  if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { 
    return res.status(400).json( { msg : 'No existen archivos para subir - validar_ArchivoSubir' } ) 
  }  

  next()
}
 
module.exports = { validar_ArchivoSubir }

