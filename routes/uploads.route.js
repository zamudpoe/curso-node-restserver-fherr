const { Router }  = require('express')
const { check }   = require('express-validator') 

const { validarCampos, validar_ArchivoSubir } = require('../middlewares') 
const { cargarArchivo, actualizarImagen, mostrarImgaen, actualizarImagenCloudinary }     = require('../controllers/uploads.controller') 
const { coleccionesPermitidas }               = require('../helpers/db-validators') 

const router                  = Router() 

/* [ SUBIR ARCHIVOS ] {{url}}/api/uploads/ */
router.post( '/', validar_ArchivoSubir, cargarArchivo )

/* [ ACTUALIZACION ] {{url}}/api/uploads/ */
router.put( '/:coleccion/:id', [
  validar_ArchivoSubir,
  check('id','El id debe de ser de Mongo').isMongoId() ,
  check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'categorias', 'productos' ] ) ) ,   
  validarCampos
], actualizarImagenCloudinary ) 
/* actualizarImagen */

/* [ MOSTRAR IMAGEN ] Mostrar las imagenes */
router.get('/:coleccion/:id',[
  check('id','El id debe de ser de Mongo').isMongoId() ,
  check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'categorias', 'productos' ] ) ) ,   
  validarCampos
] , mostrarImgaen )
 
// Exportamos el router. 
module.exports = router
