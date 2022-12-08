const { request: req , response:res } = require('express')

const usuariosGet = ( req , res ) => { 

  //const query = req.query
  //console.log( 'query Params: %o', query )
  const { q , nombre = "No Definido", page = 1, limit, apikey } = req.query

  //console.log( 'q : %s nombre: %s  apikey: %s', q, nombre, apikey )

  res.json({
    msg: "GET API - usuariosGet" , 
    q , 
    nombre , 
    apikey , 
    page , 
    limit 
  }) 

}  

const usuariosPost =  ( req, res ) => { 
  const { nombre, edad } = req.body  
  
  console.log('\n\tNombre :'.cyan.bold + nombre.green.bold + ' Edad: '.cyan.bold + String(edad).yellow.bold +'.\n' ) 

  res.json({
    msg: "POST API - usuariosPost" , 
    nombre,
    edad 
  }) 

} 

const usuariosPut = ( req, res ) => {            

  const id = req.params.id 

  console.log( '\n\tEl id del usurio es : '.cyan + '%s'.yellow.bold , id )

  res.json({
    msg: "PUT API - usuarioPut", 
    id
  }) 
} 

const usuariosPatch = ( req, res ) => {            
  res.json({
    msg: "PATCH API - usuarioPatch"
  }) 
}

const usuariosDelete = ( req, res ) => {            
  res.json({
    msg: "DELETE API - usuarioDelete" 
  })  
} 

/* EXPORTAMOS LAS FUNCIONES CONTROLADORAS */
module.exports = {  
  usuariosGet , 
  usuariosPost ,
  usuariosPut , 
  usuariosPatch , 
  usuariosDelete , 
}
