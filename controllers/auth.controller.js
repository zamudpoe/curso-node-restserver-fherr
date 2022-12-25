const { response, json }  = require("express")
const bcryptjs            = require('bcryptjs')

const Usuario             = require("../models/usuario")
const { generarJWT }      = require("../helpers/generarJWT")

const { google_verify }   = require('../helpers/google-verify')

/* POST REQUEST */
const login = async ( req , res = response ) => { 
  const { correo, password } = req.body

  try {  
 
    // 1. Verificar si el email existe. 
    const usuario = await Usuario.findOne({ correo })

    if ( !usuario ) {
      return res.status(400).json({
              msg: "Usuario/Password no son correctos! - [ correo ]"
            })
    }
    
    // 2. Si el usuario esta activo. 
    if ( !usuario.estado ) {
      return res.status(400).json({
        msg: "Usuario inactivo - [ estado : false ]" 
      })
    }

    // 3. Verificar la contraseña.
    const validPassword = bcryptjs.compareSync( password , usuario.password ) 
    //console.log( "\tusuario.password : %s , password: %s", usuario.password, password )
    if ( !validPassword ) { 
      return res.status(400).json({
        msg: "Usuario/Password no son correctos! - [ Password ]"
      })
    }

    // 4. Generar el JWT. 
    /* 
      Necesitamos transformar el callback de el paquete jsonwebtoken 
      en una promesa, asi que creamos el helper 'generarJWT' para esto 
    */ 
    const token = await generarJWT ( usuario.id )  // Lo que se grabara en el payload es el usuario.id
    console.log( token ) 

    res.json( { 
      usuario, 
      token 
    } ) 

  } catch ( error ) { 
    console.log( error )  
    res.status(500).json( { msg: "Algo salio mal!, hable con el administrador!" } ) 
  } 
 
}

const googleSignIn = async ( req, res = response ) => {
  console.clear()   
  const { id_token } = req.body 

  try {
    const googleUser              = await google_verify( id_token ) 
    const { correo, nombre, img } = googleUser     
    
    
    // Consultamos por el correo en nuestra Mongo DB 
    let usuario = await Usuario.findOne( { correo } )    

    if ( !usuario ) {
      // SI NO EXISTE TENEMOS QUE CREARLO 
      console.log(`\n\tNo existe usuario con correo [ ${ correo } ] en nuestra DB, se procede a crearlo con los datos obtenidos de google_verify\n`)
      
      const data = { 
        nombre , 
        correo , 
        password : "12345", 
        img, 
        "rol"    : "TI_ROLE" , 
        "google" : true 
      } 

      usuario = new Usuario( data ) 
      const salt       = bcryptjs.genSaltSync() 
      usuario.password = bcryptjs.hashSync( data.password, salt ) 

      // GUARDAMOS 
      await usuario.save() 
      console.log(usuario) 
    } 

    if ( !usuario.google || !usuario.estado ) { 
      let menesaje = `\n\n::::::[ Hable con el administrador de sistema ]::::::\n\nUsuario Google [ ${ usuario.correo } - Bloqueado o Inactivo ] \n`
      console.log(menesaje) 
      return res.status(401).json({ msg: menesaje }) 
    } 

    // Generamos JWT 
    const token = await generarJWT ( usuario.id ) 
    
    console.log( `\n\tUsuario [ ${usuario.nombre} ] Loggeado exitosamente!\n\nCon Token:[ ${token}\n ]` )

    res.json({ 
      usuario,
      token, 
    }) 

  } catch (error) {  
    res.status(400).json({  
      ok  : false, 
      msg : 'El token no se pudo verificar ' 
    }) 
  } 

} 
 
module.exports = {
  login,
  googleSignIn
} 

