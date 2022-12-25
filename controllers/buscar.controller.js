/* -------------------------[ IMPORTACIONES ]------------------------ */
const { response }  = require("express") 
const { ObjectId }  = require("mongoose").Types
const { Usuario, Categoria, Producto }   = require('../models/')

/* -------------------------[ VARIABLES ]------------------------ */
// Aqui agregaremos las coleecciones permitidas para las busquedas. 
const coleeccionesPermitidas = [  
  'usuarios', 
  'categorias', 
  'productos', 
  'roles'
]

/* -------------------------[ Funciones ]------------------------ */
const buscarUsuarios = async ( termino='', res = response  ) => { 

  const esMongoID = ObjectId.isValid( termino ) // TRUE 
  if ( esMongoID ) { 
    const usuario = await Usuario.findById( termino ) 
    console.log( usuario ) 
    return res.status(200).json( {
      results: (usuario) ? [ usuario ] : []
    } )
  } 

  const regex = new RegExp( termino , 'i' ) 
  const usuarios = await Usuario.find({ 
    $or : [ { nombre: regex }, { correo: regex } ] ,
    $and: [ { estado : true } ]
  }) 

  return res.status(200).json( { 
    results : usuarios 
  } ) 

}   

const buscarCategorias = async ( termino='', res = response  ) => { 

  const esMongoID = ObjectId.isValid( termino ) // TRUE 
  if ( esMongoID ) { 
    const categoria = await Categoria.findById( termino ).populate("usuario", "nombre") 
    console.log( categoria ) 
    return res.status(200).json( {
      results: (categoria) ? [ categoria ] : []
    } )
  } 

  const regex = new RegExp( termino , 'i' ) 
  const categorias = await Categoria.find({ 
    $or : [ { nombre: regex } ] ,
    $and: [ { estado : true } ]
  }).populate("usuario", "nombre") 

  return res.status(200).json( { 
    results : categorias  
  } ) 

} 

const buscarProductos = async ( termino='', res = response  ) => { 

  try { 
    const esMongoID = ObjectId.isValid( termino ) // TRUE 
    if ( esMongoID ) { 
      const producto = await Producto.findById( termino )
                              .populate("categoria", "nombre")
                              .populate("usuario", "nombre") 
      console.log( producto ) 
      return res.status(200).json( { 
        results: (producto) ? [ producto ] : [] 
      } ) 
    } 
   
    const regex = new RegExp( termino , 'i' ) 
    const productos = await Producto.find({ 
      $or : [ { nombre: regex } ], 
      $or : [ { descripcion: regex } ], 
      $and: [ { estado : true } ] 
    })
    .populate("categoria", "nombre") 
    .populate("usuario", "nombre") 
   
    return res.status(200).json( { 
      results : productos 
    } ) 

  } catch ( error ) {
    console.log(`error: ${ error.message }`)
  }

}  


// Controlador para la ruta 'api/buscar/:coleccion/:termino' 
const buscar = ( req, res = response )  => { 

  const { coleccion , termino  } = req.params   

  if ( !coleeccionesPermitidas.includes( coleccion ) ) {
    console.log('Las colecciones permitidas son : %o', coleeccionesPermitidas) 
    return res.status(400).json({ 
      msg: `Las colecciones permitidas son: ${ coleeccionesPermitidas }`  
    })
  }
 
  console.clear() 
  switch (coleccion) { 
    case 'usuarios':      
      buscarUsuarios( termino , res ) 
    break

    case 'categorias': 
      buscarCategorias( termino , res ) 
    break 

    case 'productos': 
      buscarProductos( termino , res ) 
    break

    default:
      res.status(500).json({
        msg: 'Se te olvido hacer esta busqueda!' 
      })
      break 
  }
 
  /* console.log("\nRuta de busquedas en desarrollo!\n") 
  res.status(200).json({ 
    msg: "Ruta de busquedas en desarrollo!" , 
    coleccion , 
    termino
  })  */
 
}

module.exports = buscar 
 
