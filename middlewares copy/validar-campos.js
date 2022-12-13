const { validationResult }  = require('express-validator')

const validarCampos  = ( req, res, next ) => { 
  const errors = validationResult( req ) 
  
  if ( !errors.isEmpty() ) 
    return res.status( 400 ).json( errors )   

  next() // Si el middleware pasa se llama next para que pase al siguiente middleware. ASi funciona NEXT
}
 
module.exports = {
  validarCampos
}


