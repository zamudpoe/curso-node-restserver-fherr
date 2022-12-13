const { 
  request, 
  response 
}             = require('express') 
const jwt     = require('jsonwebtoken') 

const Usuario = require('../models/usuario')   

/*
  Este middleware lo vamos a usar cuando se necesite validar 
  el token para que si esta valido se pueda realizar ciertas acciones... como 

  BORRAR UN USUARIO.
*/

/* Los middleware tienen 3 argumentos */ 
const validarJWT = async ( req = request, res = response, next ) => { 
  const token = req.header('x-token') 

  if ( !token ) { 
    return res.status( 401 ).json({ 
      msg : "No hay token en la petición" 
    })
  }
 
  try { 
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )     

    let usuario = await Usuario.findById( uid ) 

    if ( !usuario ) { return res.status(401).json({ msg: "[ Usuario no encontrado en BD! ] - Token no valido" }) }
    // Verificar si el uid tiene estado true. 
    if ( !usuario.estado ) { return res.status(401).json({ msg: "[ Usuario con estado: false ] - Token no valido" }) } 
    req.usuarioAut = usuario 
    next() 
  } catch ( error ) { 
    console.log( error.message )  
    res.status(401).json({ 
      msg : `[Token no valido]- ${error.message}`
    })
  }

}

module.exports = {
  validarJWT 
}
 