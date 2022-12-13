/* ---------------------------- [ IMPORTACIONES ] --------------------------- */
/* const { 
  request: req , 
  response: res 
}                     = require('express') */
const bcryptjs        = require('bcryptjs')

const Usuario         = require('../models/usuario') 
 

/* 
  Al usarlo son la 'U' mayusucula nos permitira crear instancias de nuestro modelo usuario
  y diferenciarlo del usuario con u minuscula : 
    const usuario = new Usuario() 
*/

/* ------------------------ [ MANEJO DE SOLICITUDES ] ----------------------- */
/* GET REQUEST */
const usuariosGet = async ( req , res ) => { 
  let { q, nombre = 'No Name', apiKey, desde=0, limite=5 } = req.query 
  const query = { estado: true }

  desde  = (typeof  Number(desde) !== 'number') ? 0 : desde  
  limite = (typeof Number(limite) !== 'number') ? 5 : limite 
  
  /*  ESTO NO ES FUNCIONALMENTE CORRECTO POR QUE SE RESUELVEN DE FORMA INDEPENDIENTE Y CON DESFASE */
  /* const usuarios = await Usuario.find(query)
  .skip( Number(desde) ) 
  .limit( Number(limite) ) 
  
  const totalRegistros  = await Usuario.countDocuments(query) */ 
  

  /* TENDREMOS LA RESPUESTA HASTA QUE TODAS LAS PROMESAS SE RESUELVAN! */
  const [ totalRegistros, usuarios ] = await Promise.all([ 
    Usuario.countDocuments( query ), 
    Usuario.find( query )
      .skip( Number( desde ) ) 
      .limit( Number( limite ) ) 
  ]).finally( () => console.log("PROMESAS REALIZADAS") )
  
  console.clear() 
  console.log( "desde: %s, limite: %s", desde ,limite ) 
  console.log( '\n\tExisten un total de [  %s  ] documentos para USUARIOS en la BD \n' , totalRegistros )   

  res.json({ 
    /* resp */ 
    totalRegistros,
    usuarios 
  })  
}  

/* POST REQUEST */
const usuariosPost = async ( req, res ) => { 

  const { nombre, correo, password, rol } = req.body
  const usuario = new Usuario( { nombre, correo, password, rol } ) 
 
  // [ Hacer el hash ] Encriptar la contraseña  
  const salt       = bcryptjs.genSaltSync() 
  usuario.password = bcryptjs.hashSync( password, salt ) 

  //console.log("usuario.password :", usuario.password)
  // Guardar en DB.  
  await usuario.save() 

  // Enviamos el usuario grabado al Front End
  res.json({ 
    usuario 
  }) 

} 

/* PUT REQUEST */
const usuariosPut = async ( req, res = response ) => {            
  const id    = req.params.id 
  const { 
    _id,
    password , 
    google , 
    correo , 
    ...resto 
  }           = req.body 

  console.log( '\n\tEl id del usuaio es : '.cyan + '%s'.yellow.bold , id ) 

  // TODO Validar contra la BD 
  if ( password ) { 
    // [ Hacer el hash ] Encriptar la contraseña  
    const salt     = bcryptjs.genSaltSync() 
    resto.password = bcryptjs.hashSync( password, salt ) 
  }

  // Encontrar el usuario por su id y ACTUALIZAR con el resto de sus campos. 
  const usuario = await Usuario.findByIdAndUpdate( id , resto )  

  // Respondemos al cliente!. 
  res.json( usuario ) 
} 

/* PATCH REQUEST */
const usuariosPatch = ( req, res ) => {            
  res.json({
    msg: "PATCH API - usuarioPatch"
  }) 
}

/* DELETE REQUEST */
const usuariosDelete = async ( req, res ) => { 

  const { id } = req.params 
  const usuario = await Usuario.findByIdAndUpdate( id , { estado: false } ) // Lo Marcamos inactivo. 
  
  /* 
    1. Obtener usuario autenticado.  
       const usuarioAutenticado = req.usuarioAut  
    2. agreagr el usuario autenticado
       res.json( { usuario , usuarioAutenticado } )  
  */

  res.json( usuario ) 
} 

/* --------------- [ EXPORTAMOS LAS FUNCIONES CONTROLADORAS ] --------------- */
module.exports = {  
  usuariosGet , 
  usuariosPost ,
  usuariosPut ,  
  usuariosPatch , 
  usuariosDelete 
}
