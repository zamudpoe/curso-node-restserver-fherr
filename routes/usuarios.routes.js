const { Router } = require('express') 

const { 
  usuariosGet, 
  usuariosPost, 
  usuariosPut, 
  usuariosPatch,  
  usuariosDelete, 
} = require('../controllers/usuarios.controllers') 
const router     = Router() 

/* ::::::::::::::::::::::::::::::::::[ RUTAS ]:::::::::::::::::::::::::::::::::: */

/* GET */
router.get('/',  usuariosGet ) 

/* POST */
router.post('/', usuariosPost ) 

/* PUT */
router.put('/:id', usuariosPut ) 

/* PATCH */
router.patch('/', usuariosPatch ) 

/* DELETE */
router.delete('/', usuariosDelete ) 

/*:::::::::::::::::::[ Exportamos las funciones controladoras ]:::::::::::::::::::*/
module.exports = router
