# **[** 186 **]** Buscar En Otras Colleccioines

Haremos busquedas en otras colecciones por medio del metodo populate , haciendo la union con la llave foranea , veamos esto con la funcion ``buscarProductos`` , cuando hacemos la instancia del modelo producto le anexamos el metodo populate con el cual haremos la consulta a otras coleccionies , en este caso a la coleccion **``categoria``** y la coleccion **``usuario``** 

```javascript
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


```

 
