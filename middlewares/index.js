const validarCampos        = require('./validar-campos')
const validarJWT           = require('./validar-jwt')
const validaRoles          = require('./validar-roles')
const validar_ArchivoSubir = require('./validar-archivos')

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validaRoles,
  ...validar_ArchivoSubir
}

