const Role       = require('../models/role') 
const { Usuario , Categoria, Producto }    = require('../models')  

/* --------------------------------[ ROLE ]-------------------------------- */
const esRoleValido = async ( rol = '' ) => { 
  const existeRol = await Role.findOne( { rol } )
  if ( !existeRol ) { throw new Error(`El rol[ ${ rol } ] no esta registrado en la DB!`) } 
} 

/* -------------------------------[ USUARIO ]------------------------------ */
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

/* ------------------ [ VALIDACIONES PARA LAS CATEGORIAS ] ------------------ */
const existeCategoriaPorId = async ( id ) => { 
  const existeCategoria = await Categoria.findById( id ) 
  if ( !existeCategoria ) { 
    throw new Error(`El Id[ ${ id } ] de la categoria no esta registrado en la DB!`) 
  } 
} 

/* ------------------ [ VALIDACIONES PARA LAS PRODUCTOS ] ------------------ */
const existeProductoPorId = async ( id ) => { 
  const existeProducto = await Producto.findById( id ) 
  if ( !existeProducto ) { 
    throw new Error(`El Id[ ${ id } ] del producto no esta registrado en la DB!`) 
  } 
} 

/* EXPORTAMOS */
module.exports = {
  esRoleValido , 
  emailExiste , 
  existeUsuarioPorId ,
  existeCategoriaPorId ,
  existeProductoPorId 
}

