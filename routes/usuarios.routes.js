const { Router }        = require('express')  
const { check }         = require('express-validator') 

const { validarCampos } = require('../middlewares/validar-campos') 
const { 
  esRoleValido, 
  emailExiste, 
  existeUsuarioPorId }  = require('../helpers/db-validators') 

const { 
  usuariosGet, 
  usuariosPost, 
  usuariosPut, 
  usuariosPatch, 
  usuariosDelete, 
}                      = require('../controllers/usuarios.controllers') 

const router           = Router() 

/* ::::::::::::::::::::::::::::::::::[ RUTAS ]:::::::::::::::::::::::::::::::::: */ 

/* GET */
router.get('/',  usuariosGet ) 

/* PUT */
router.put( '/:id', [
  check( 'id', 'No es un ID válido!' ).isMongoId() , 
  check( 'id' ).custom( existeUsuarioPorId ) , 
  check( `rol` ).custom( esRoleValido ) , 

  validarCampos
], usuariosPut ) 

/* POST */  
router.post('/', 
  [ 
    check( `nombre`   , `El nombre es obligatorio` ).trim().not().isEmpty() , 
    check( `password` , `El password es obligatorio & mayor de 6 letras!` ).trim().not().isEmpty().isLength({ min: 6 }), 
    check( 'correo'   , `El correo no es válido!` ).trim().isEmail() ,  
    // VERIFICACION PERSONALIZADA 
    check( `correo` ).custom( emailExiste ) , 
    /* check( `rol`      , `El Rol es obligatorio & debe ser valido` ).trim().not().isEmpty().isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]) , */  
    // VERIFICACION PERSONALIZADA 
    check( `rol` ).custom( esRoleValido ) , 
    /*  custom va a recibir como argumento el valor 'rol' que estoy 
    evaluando del body, en este caso el 'rol'. */

    validarCampos 
  ] , usuariosPost ) 

/* DELETE */ 
router.delete('/:id', [
  check( 'id', 'No es un ID válido!' ).isMongoId() , 
  check( 'id' ).custom( existeUsuarioPorId ) , 
  validarCampos
],usuariosDelete ) 

/* PATCH */ 
router.patch('/', usuariosPatch ) 

/*:::::::::::::::::::[ Exportamos las funciones controladoras ]:::::::::::::::::::*/
module.exports = router 



