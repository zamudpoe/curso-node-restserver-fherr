const { Router }                    = require('express') 
const { check }                     = require('express-validator') 

const { crearProducto , 
        obtenerProductos, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto }            = require('../controllers/productos.controller')

const { existeCategoriaPorId , existeProductoPorId } = require('../helpers/db-validators')

const { validarJWT, 
        validarCampos,
        esAdminRole }               = require('../middlewares') 

/* 
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto,
        borrarProducto}          = require('../controllers/productos.controller') 
*/

const router                      = Router() 

/* 
  RUTA: {{url}}/api/productos 
*/ 

/* TODO
  Vamos a necesitar estos 5 servicios REST por lo regular. 
  1. GET [ TODAS LA PRODUCTOS ]  
  2. GET una producto en particular
  3. PUT - Modificar una producto
  4. POST - CREAR NUEVA PRODUCTO
  5. DELETE - BORRAR PRODUCTO 
*/

// [ TERMINADO ] [ POST ] CREAR PRODUCTO
router.post('/', [
  validarJWT,   
  check('nombre' , 'El nombre es obligatorio').not().isEmpty(), 
  check('categoria' , 'No es un id de Mongo valido!').isMongoId(), 
  check('categoria').custom( existeCategoriaPorId ), 
  validarCampos
] , crearProducto ) 

// [ TERMINADO ]  [ GET ] OBTENER TODAS LOS PRODUCTOS 
// ::::::::::::::::[ Servicio Publico ]:::::::::::::::: 
router.get('/', obtenerProductos ) 

// [ TERMINADO ]  [ GET ] OBTENER UNA PRODUCTO POR ID - Servicio Publico. 
router.get('/:id', [ 
  /* validarJWT, */ 
  check('id',`No es un id de Moingo`).isMongoId(), 
  check('id').custom( existeProductoPorId ), 
  validarCampos 
] , obtenerProducto ) 

// [ PUT ] ACTUALIZAR UNA PRODUCTO 
// :::::::::: PRIVADO : CUALQUIER PERSONA CON UN TOKEN VALIDO ::::::::::
router.put('/:id', [  
  validarJWT,
  check('nombre' , 'El nombre es obligatorio').not().isEmpty(), 
  check('descripcion' , 'La descripcion es obligatoria').not().isEmpty(), 
  check('id' , 'No es un id de Mongo valido!').isMongoId(), 
  check('id').custom( existeProductoPorId ) ,
  validarCampos 
], actualizarProducto ) 


// [ DELETE ] ELIMINA UNA PRODUCTO - ADMIN
router.delete('/:id', [   
  validarJWT, 
  esAdminRole, 
  check('id',`No es un id de Mongo`).isMongoId() , 
  check('id').custom( existeProductoPorId ) , 
  validarCampos  
], borrarProducto ) 

// Exportamos el router. 
module.exports = router
