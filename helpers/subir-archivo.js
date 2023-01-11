const path            = require('path')
const { v4 : uuidv4 } = require('uuid')

const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = ''  ) => { 

  return new Promise( ( resolve, reject ) => { 

    const { archivo }   = files 
    const nombreCortado = archivo.name.split('.')
    const extension     = nombreCortado[ nombreCortado.length - 1 ]      

    // validar la extension 
    if ( !extensionesValidas.includes( extension ) ) { 
      return reject(`La extension [${ extension }] no es permitida, PERMITIDAS => [ ${ extensionesValidas } ]`) 
    } 
  
    // Creamos un nombre unico y le anexamos la extension al nombre
    const nombreTemp  = uuidv4() + '.' + extension 
    const uploadPath  = path.join( __dirname , '../uploads/', carpeta , nombreTemp ) 
  
    // Lo guardamos 
    archivo.mv( uploadPath, (err) => { 
  
      if ( err ) { 
        console.log( err ) 
        reject(err) 
      } 
      console.log(`\n\tArchivo [ ${ nombreTemp } ] subido exitosamente!\n`) 
      resolve( nombreTemp ) 
    })
  }) 

}

module.exports = {
  subirArchivo
}
