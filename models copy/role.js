
const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
  rol : {
    type: String,
    required: [ true, "El rol es obligatorio" ]
  }
})

module.exports = model( 'Role', RoleSchema )

/*
  Recordemos que mongoose le agrega la 's' faltante , 
  ya que la coleccion guardada en mongo atlas es 'roles' 
  y no 'role' 

  nota: Los roles los creamos en mongoDb compass
*/

