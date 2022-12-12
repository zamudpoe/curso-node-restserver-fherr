const mongoose     = require('mongoose')


const dbConnection = async () => { 

  try { 
    await mongoose.connect( process.env.MONGO_ATLAS_CNN /* , {
      useNewUrlParser       : true,
      useUnifiedTopology    : true,
      useCreateIndex        : true,
      useFindAndModified     : false
    } */) 

    console.log( `\n\t[ DB ONLINE ]\n`.bgGreen.white.bold ) 

  } catch ( error ) { 
    console.log( error )  
    throw new Error('\n\tError al iniciar la base de datos\n'.cyan.bold) 
  } 

}

module.exports = { dbConnection }
 