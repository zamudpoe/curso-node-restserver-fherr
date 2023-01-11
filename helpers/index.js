const dbValidators  = require('./db-validators')
const generarJWT    = require('./generarJWT')
const google_verify = require('./google-verify') 
const subirArchivo  = require('./subir-archivo') 

module.exports = {
  ...dbValidators, 
  ...generarJWT, 
  ...google_verify, 
  ...subirArchivo
}