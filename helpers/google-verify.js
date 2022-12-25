const { OAuth2Client }  = require('google-auth-library') 
const CLIENT_ID         = process.env.GOOGLE_CLIENT_ID 
const client            = new OAuth2Client( CLIENT_ID ) 

async function google_verify( token = '' ) { 

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,  
    /* 
      Specify the CLIENT_ID of the app that accesses the backend 
      Or, if multiple clients access the backend:
        [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3] 
    */ 
  })

  const payload = ticket.getPayload() 
  const { name:nombre, picture:img, email:correo, sub:userid } = payload  /* Desectructuramos el payload */ 
  /* console.log( payload )  */ 

  return { 
    /* "userid"  : userid,   */
    "nombre"  : nombre , 
    "img"     : img , 
    "correo"  : correo, 
  }

}

module.exports = { google_verify }
