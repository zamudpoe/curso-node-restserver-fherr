/* ----------------------------- [IMPORTACIONES] ---------------------------- */
const { Router } = require('express') 
const buscar     = require('../controllers/buscar.controller') 

/* ------------------------------ [INSTANCIAS] ------------------------------ */
const router = Router() 

/* -------------------------------- [ MAIN ] -------------------------------- */

// 
router.get('/:coleccion/:termino', buscar ) 

/* -------------------------[ Exportamos el router ]------------------------ */
module.exports = router


