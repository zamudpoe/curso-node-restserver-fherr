const mongoose     = require('mongoose')
 
const dbConnection = async () => { 
  console.clear() 
  
  try { 
    await mongoose.connect( process.env.MONGO_ATLAS_CNN /* , {
      useNewUrlParser       : true,
      useUnifiedTopology    : true,
      useCreateIndex        : true,
      useFindAndModified     : false
    } */) 

    console.log( `\n\t[ DB ONLINE ]\n` ) 

  } catch ( error ) { 
    console.log( error )  
    throw new Error ( error.msg ) 
  } 

}

module.exports = { dbConnection }
  