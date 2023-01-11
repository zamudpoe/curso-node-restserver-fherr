const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({

  nombre : {
    type     : String, 
    required : [ true, "El nombre es obligatorio" ] ,
    unique   : true 
  } , 

  estado : {
    type     : Boolean, 
    default  : true, 
    /* required : true */
    required : [ true, "El estado de la categoria es obligatorio"] 
  } , 

  // Usuario que hace el ABC de las categorias.
  usuario : {
    type        : Schema.Types.ObjectId,
    ref         : 'Usuario' ,  /* A donde apunta el Schema.Types.ObjectId, */
    required    : true
  } , 
  precio: {
    type    : Number,
    default : 0
  }, 
  categoria : {
    type        : Schema.Types.ObjectId,
    ref         : 'Categoria' ,
    required    : [ true , 'Categoria es obligatorio' ]
  }, 
  descripcion   : { type: String } ,
  disponible    : { type: Boolean, default: true } ,
  img           : { type: String }
})

// NOTA: Cuando se mande llamar el metodo toJSON 
//       se ejecutara esta funcion!. 
ProductoSchema.methods.toJSON = function (  ) { 
  // Agregamos los campos que queremos quitar __v, password y _id 
  // y los demas campos los agruparemos en visibleData
  const {  __v, estado, ...visibleData } = this.toObject()  

  return visibleData 
}

module.exports = model( 'Producto', ProductoSchema )

/* 
  NOTA :  
  
  Recordemos que Mongoose al nombre del modelo le agrega la 's' faltante , 
  ya que la coleccion guardada en Mongo Atlas es 'productos' y no 'producto' 

  Nota: Los productos los creamos en mongoDb compass 
*/

