const { request, response } = require("express")
const role = require("../models/role")

/* Recordemos que los middlewares reciben 3 parametros */
const esAdminRole = ( req=request, res=response, next ) => { 

  if ( !req.usuarioAut ) { 
    return res.status( 500 ).json({ msg: "Se quiere validar el role sin validr el token primero!" })
  }  

  const { rol, nombre } = req.usuarioAut 

  if ( rol !== 'ADMIN_ROLE' ) { 
    return res.status(401).json({ 
      msg: `'${nombre}' no es parte del equipo de los IMMORTALES con roles [ADMIN_ROLE]` 
    })
  }

  console.log( 'req.user; ', req.usuarioAut )
  
  next()
}

// Middleware que recibe parametros. 
const tieneRol = ( ...roles ) => {
  
  // tenemos que retornar una funcion. 
  return ( req = request, res = response, next ) => {    

    console.log("usuarioAut tiene rol: %s",req.usuarioAut.rol )

    if ( !req.usuarioAut ) { 
      return res.status( 500 ).json({ 
        msg: "Se quiere validar el role sin validr el token primero!" 
      })
    }  
  
    if ( !roles.includes( req.usuarioAut.rol ) ) {
      return res.status(401).json({ msg: `El servicio requiere uno de estos roles [ ${roles} ]` })
    }

    console.log( 'Rol [ %s ] Permitido!', req.usuarioAut.rol  ) 

    next() 
  }

}

module.exports = {
  esAdminRole,
  tieneRol
}

