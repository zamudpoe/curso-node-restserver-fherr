const { Router }                    = require('express') 
const { check }                     = require('express-validator') 

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares') 

const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria,
        borrarCategoria}          = require('../controllers/categorias.controller') 

const { existeCategoriaPorId }    = require('../helpers/db-validators') 

const router                      = Router() 

/* 
  {{url}}/api/categorias 
*/ 
/* TODO
  Vamos a necesitar estos 5 servicios REST por lo regular. 
  1. GET [ TODAS LA CATEGORIAS ]  
  2. GET una categoria en particular
  3. PUT - Momdificar una categoria
  4. POST - CREAR NUEVA CATEGORIA
  5. DELETE - BORRAR CATEGORIA 
*/

// [ TERMINADO ]  [ GET ] OBTENER TODAS LA CATEGORIAS - Servicio Publico. 
router.get('/', obtenerCategorias ) 

// [ TERMINADO ]  [ GET ] OBTENER UNA CATEGORIA POR ID - Servicio Publico. 
router.get('/:id', [ 
  /* validarJWT, */ 
  check('id',`No es un id de Moingo`).isMongoId(),
  check('id').custom( existeCategoriaPorId ) ,
  validarCampos 
] , obtenerCategoria ) 

// [ TERMINADO ] [ POST ] CREAR CATEGORIA - PRIVADO : CUALQUIER PERSONA CON UN TOKEN VALIDO
router.post('/', [ 
  validarJWT, 
  check('nombre' , 'El nombre es obligatorio').not().isEmpty(), 
  validarCampos
] , crearCategoria ) 

// [ PUT ] ACTUALIZAR UNA CATEGORIA - PRIVADO : CUALQUIER PERSONA CON UN TOKEN VALIDO
router.put('/:id', [  
  validarJWT,
  check('nombre' , 'El nombre es obligatorio').not().isEmpty(), 
  check('id').custom( existeCategoriaPorId ) ,
  validarCampos 
], actualizarCategoria ) 

// [ DELETE ] ELIMINA UNA CATEGORIA - ADMIN
router.delete('/:id', [   
  validarJWT, 
  esAdminRole , 
  check('id',`No es un id de Mongo`).isMongoId() , 
  check('id').custom( existeCategoriaPorId ) , 
  validarCampos  
], borrarCategoria ) 
 
// Exportamos el router. 
module.exports = router
