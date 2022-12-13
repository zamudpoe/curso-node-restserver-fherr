const Role     = require('../models/role')
const Usuario  = require('../models/usuario') 

const esRoleValido = async ( rol = '' ) => { 
  const existeRol = await Role.findOne( { rol } )
  if ( !existeRol ) { throw new Error(`El rol[ ${ rol } ] no esta registrado en la DB!`) } 
} 

const emailExiste = async ( email = '' ) => {  
  const existeEmail = await Usuario.findOne({ correo: email }) 
  if ( existeEmail ) { throw new Error( `El e-mail [ ${ email } ] ya esta registrado, intentar registro con otro email por favor!` ) } 
}

const existeUsuarioPorId = async ( id ) => { 
  const existeUsuario = await Usuario.findById( id ) 
  if ( !existeUsuario ) { 
    throw new Error(`El ID[ ${ id } ] no esta registrado en la DB!`) 
  } 
} 

module.exports = {
  esRoleValido , 
  emailExiste , 
  existeUsuarioPorId 
}

