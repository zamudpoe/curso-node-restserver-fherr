const { response }  = require("express") 
const { Categoria } = require("../models") 

// [ TERMINADO ] obtenerCategorias - TODAS - paginado - total - populate
const obtenerCategorias = async ( req, res = response ) => {  
  let { desde=0, limite=5 } = req.query 
  const query       = { estado: true } 

  desde  = (typeof  Number(desde) !== 'number') ? 0 : desde  
  limite = (typeof Number(limite) !== 'number') ? 5 : limite   
  
  const [ totalRegistros, categorias ] = await Promise.all([ 
    Categoria.countDocuments( query ), 
    Categoria.find( query )
      .populate( 'usuario','nombre' )
      .skip( Number( desde ) ) 
      .limit( Number( limite ) ) 
  ]).finally( () => console.log("PROMESAS REALIZADAS") )
   
  console.clear() 
  console.log( "desde: %s, limite: %s", desde ,limite ) 
  console.log( '\n\tExisten un total de [  %s  ] documentos para USUARIOS en la BD \n' , totalRegistros )   

  res.status(200).json({ 
    /* resp */ 
    totalRegistros,
    categorias 
  }) 
  
}

// [ TERMINADO ] obtenerCategoria - populate {}
const obtenerCategoria = async ( req, res = response ) => {  
  const { id } = req.params 

  const categoria = await Categoria.findById( id ).populate('usuario', 'nombre') 

  /* 
  if ( !categoria ) {
    console.clear() 
    console.log(`\n\tID [ ${id} ] NO EXISTE EN LA BD!\n`)
    return res.status(400).json({
      msg: `ID [${id}] NO EXISTE EN LA BD!`
    })
  } 
  */

  console.log( `[ TERMINADO - GET--ID ] CONSULTA 1 CATEGORIA ID [ ${ id } ]` )
  
  res.status(200).json( categoria )
    
} 

// [ TERMINADO ] POST CREAR CATEGORIA - {{url}}/api/categorias/ 
const crearCategoria = async ( req, res = response ) => { 
  // Desestructuramos lo que viene en el body!. 
  const nombre      = req.body.nombre.toUpperCase() 
  const categoriaDB = await Categoria.findOne( { nombre } ) 
  
  // Si no es snula es que ya existe
  if ( categoriaDB ) { 

    return res.status(400).json({ 
      msg :`La categoria [ ${categoriaDB.nombre} ]; Ya existe!` 
    }) 

  } 

  // console.log(req.usuarioAut)   
  const data = {
    nombre,
    usuario: req.usuarioAut._id  // OJO: lo traemos desde el middleware validar-jwt.jks
  }

  const categoria = new Categoria( data )

  // GUARDAR en DB
  await categoria.save()

  /*  
    Si las validaciones de los middleware  
    en la ruta "categorias.route.js" : 
      check , 
      validarJWT, 
      validarCampos 
    estan OK mandamos el response! 
  */ 
  res.status(201).json({ 
    /* msg: "[ PROCESO EN CONSTRUCCION ] POST DE CREACION DE CATEGORIA", */
    categoria 
  })

}

// [ TERMINADO ] actualizarCategoria
const actualizarCategoria = async ( req, res = response ) => {
  const { id }                       = req.params 
  const { estado, usuario, ...data } = req.body 

  data.nombre  = data.nombre.toUpperCase()
  data.usuario = req.usuarioAut._id 

  /* 
  const usuarioAct = await Usuario.findOne({ id })     
  data.usuarioAct  = usuarioAct 
  */

  const categoriaActualizada = await Categoria.findByIdAndUpdate( id, data, { new:true } ) 
  console.log( 'categoriaActualizada: %o ',  categoriaActualizada ) 

  
  res.status( 200 ).json( categoriaActualizada ) 
}
 
// [ TERMINADO ] borrarCategorias - estado : false 
const borrarCategoria = async ( req, res = response ) => {
  const { id }               = req.params
  const categoriaActualizada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } ) 
  console.log( "categoriaActualizada : %o" , categoriaActualizada ) 
  res.status(200).json( categoriaActualizada ) 
}  

module.exports = { 
  crearCategoria, 
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria, 
  borrarCategoria 
} 

