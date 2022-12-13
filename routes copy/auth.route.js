const { Router }              = require('express') 
const { check }               = require('express-validator') 

const { validarCampos }       = require('../middlewares/validar-campos') 
const { login, googleSignIn } = require('../controllers/auth.controller') 

const router                  = Router() 

router.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(), 
  check('password', 'El password es obligatorio').not().isEmpty(), 

  validarCampos
], login  ) 

 
router.post('/google', [
  check('id_token', 'id_token de Google es obligatorio').not().isEmpty(), 

  validarCampos
], googleSignIn  )  

// Exportamos el router. 
module.exports = router
