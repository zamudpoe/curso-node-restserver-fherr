const { Schema, model } = require('mongoose') 

/* 
let rolesValidos = {
  values    : [ 'ADMIN_ROLE', 'USER_ROLE', 'SUPER_ROLE' ] ,
  message   : '{VALUE} no es un rol válido' 
} 
*/
 
const UsuarioSchema = Schema({
  nombre : { 
    type     : String , 
    required : [ true, 'El nombre es obligatorio' ] ,  
  } , 
  correo : { 
    type     : String , 
    required : [ true, 'El correo es obligatorio' ] ,  
    unique   : true 
  } , 
  password : { 
    type     : String , 
    required : [ true, 'La contraseña es obligatoria' ] 
  }, 
  img : { 
    type     : String     
  }, 
  rol : { 
    type    : String , 
    required : true, 
    /* enum    : [ 'ADMIN_ROLE', 'USER_ROLE', 'SUPER_ROLE' ] */
  }, 
  estado: {
    type: Boolean,
    default: true
  },
  google : { 
    type    : Boolean ,
    default : false
    
  }, 
})

// NOTA: Cuando se mande llamar el metodo toJSON 
//       se ejecutara esta funcion!. 
UsuarioSchema.methods.toJSON = function (  ) { 
  // agregamos los campos que queremos quitar __v, password 
  // y los demas campos los agruparemos en visibleUser
  const { password, __v , ...visibleUser } = this.toObject() 
  return visibleUser 
}

module.exports = model( 'Usuario', UsuarioSchema )
