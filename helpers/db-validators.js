const Role = require('../models/role') 
const { 
  Usuario, 
  Categoria, 
  Producto 
} = require('../models')  

/* --------------------------------[ ROLE ]-------------------------------- */
const esRoleValido = async ( rol = '' ) => { 
  const existeRol = await Role.findOne( { rol } )
  if ( !existeRol ) { throw new Error(`El rol[ ${ rol } ] no esta registrado en la DB!`) } 

  return true 
} 

/* -------------------------------[ USUARIO ]------------------------------ */
const emailExiste = async ( email = '' ) => {  
  const existeEmail = await Usuario.findOne({ correo: email }) 
  if ( existeEmail ) { throw new Error( `El e-mail [ ${ email } ] ya esta registrado, intentar registro con otro email por favor!` ) } 
  
  return true 
}

const existeUsuarioPorId = async ( id ) => { 
  const existeUsuario = await Usuario.findById( id ) 
  if ( !existeUsuario ) { 
    throw new Error(`El ID[ ${ id } ] no esta registrado en la DB!`) 
  } 

  return true 
} 

/* ------------------ [ VALIDACIONES PARA LAS CATEGORIAS ] ------------------ */
const existeCategoriaPorId = async ( id ) => { 
  const existeCategoria = await Categoria.findById( id ) 
  if ( !existeCategoria ) { 
    throw new Error(`El Id[ ${ id } ] de la categoria no esta registrado en la DB!`) 
  } 

  return true   
} 

/* ------------------ [ VALIDACIONES PARA LAS PRODUCTOS ] ------------------ */
const existeProductoPorId = async ( id ) => { 
  const existeProducto = await Producto.findById( id ) 
  if ( !existeProducto ) { 
    throw new Error(`El Id[ ${ id } ] del producto no esta registrado en la DB!`) 
  } 

  return true 
} 

/* -------------------[ Validar colecciones permitidas ]------------------- */
const coleccionesPermitidas = async ( coleccion = '', colecciones = ['usuario','productos','categorias'] ) => { 

  const incluida = colecciones.includes( coleccion ) 
  if (!incluida) { 
    console.log(`La coleccion [ ${coleccion} ] no es permitida, Permitidas => ${ colecciones }`)
    throw new Error(`La coleccion [ ${coleccion} ] no es permitida, Permitidas => ${ colecciones }`)
  } 
  
  return true 
}

/* EXPORTAMOS */
module.exports = {
  esRoleValido , 
  emailExiste , 
  existeUsuarioPorId ,
  existeCategoriaPorId ,
  existeProductoPorId ,
  coleccionesPermitidas
}

