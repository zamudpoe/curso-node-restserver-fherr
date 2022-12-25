const { response }  = require("express") 
const { Producto, 
        Categoria } = require("../models") 

// [ TERMINADO ] POST CREAR PRODUCTO - {{url}}/api/productos/ 
const crearProducto = async ( req, res = response ) => { 
  const {    
    // Sacamos el estado y el usuario. 
    estado, usuario, categoria:id_categoria, ...body 
  } = req.body

  const productoDB = await Producto.findOne({ nombre: body.nombre })
  if ( productoDB ) {
    console.clear()
    console.log(`\n\tEl producto [ ${productoDB.nombre} ]; Ya existe!\n` )
    return res.status(400).json({ 
      msg :`El producto [ ${productoDB.nombre} ]; ¡Ya existe!` 
    }) 
  }  

  const data_categoria = await Categoria.findById( id_categoria )
  console.clear()
  console.log( 'data_categoria: %o', data_categoria )

 // console.log(req.usuarioAut )   
  // Generar la data a guardar. 
  const data = { 
    ...body, 
    nombre: body.nombre.toUpperCase(), 
    categoria : id_categoria, 
    usuario   : req.usuarioAut._id  // OJO: lo traemos desde el middleware validar-jwt.jks
  }

  const producto = new Producto( data ) 
  // GUARDAR en DB 
  await producto.save()   
  //console.log( producto ) 
  res.status(201).json( producto ) 

}

// [ PENDIENTE ] GET {{url}}/api/productos/?desde=2&limite=4 
// ::::::::::::::::[ Obtener productos ]:::::::::::::::: 
const obtenerProductos = async ( req, res = response ) => {
  let { desde   = 0, limite = 5 } = req.query 
  const query   = { estado: true } 

  console.clear() 
 
  desde  = (typeof Number(desde) !== 'number') ? 0 : desde  
  limite = (typeof Number(limite) !== 'number') ? 5 : limite 

  const [ totalRegistros, productos ] = await Promise.all([ 
    Producto.countDocuments( query ), 
    Producto.find( query ) 
      .populate( 'usuario'  ,'nombre' )
      .populate( 'categoria','nombre' )
      .skip( Number( desde ) ) 
      .limit( Number( limite ) ) 
  ]).finally( () => console.log("\n\t[ PROMESAS REALIZADAS ]\n") )   
  
  console.log( "desde: %s, limite: %s", desde ,limite ) 
  console.log( '\n\tExisten un total de [  %s  ] documentos para USUARIOS en la BD \n' , totalRegistros )   

  res.status(200).json({
    msg: "[ DESARROLLANDOSE ] - OBTENER PRODUCTOS",
    totalRegistros,
    productos 
  }) 

}

// [ TERMINADO ] obtenerProducto 
// :::::::::::::[ populate {} ]::::::::::::: 
const obtenerProducto = async ( req, res = response ) => {  
  const { id }    = req.params 
  const producto  = await Producto.findById( id )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre') 

  console.log( `[ TERMINADO - GET--ID ] CONSULTA 1 PRODUCTO ID [ ${ id } ]` )  
  res.status(200).json( producto )     
} 

// [ TERMINADO ] actualizarProducto
const actualizarProducto = async ( req, res = response ) => {
  const { id }                       = req.params 
  const { estado, usuario, ...data } = req.body 

  if ( data.nombre ) { data.nombre     = data.nombre.toUpperCase() } 

  data.usuario    = req.usuarioAut._id 
  const productoActualizado = await Producto.findByIdAndUpdate( id, data, { new:true } ) 
  console.log( 'productoActualizado: %o ',  productoActualizado ) 
  
  res.status( 200 ).json( productoActualizado ) 
} 

// [ TERMINADO ] borrarCategorias - estado : false 
const borrarProducto = async ( req, res = response ) => {
  const { id }              = req.params
  const productoActualizado = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } ) 
  console.log( "productoActualizado : %o" , productoActualizado ) 
  res.status(200).json( productoActualizado ) 
}  

module.exports = { 
  crearProducto, 
  obtenerProductos,
  obtenerProducto,
  actualizarProducto, 
  borrarProducto      
} 
