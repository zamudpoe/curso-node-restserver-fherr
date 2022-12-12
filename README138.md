# 138. Desplegar RESTServer en Railway

Ahora lo que haremos es poneer el proyecto de Railway con la version **``2.0.0``** por que se introdujeron muchas funcionalidades nuevas, entonces vamos a hacerlo con la misma idea de las ramas pero en vez de hacerlo desde Github lo vamos a hacer desde el editor de codigo de **VSCode** 


**PASOS :**

Copiamos todo lo de esta carpeta ``S9_AlcancesDelRESTServerYMttoDeLaColeccionDeUsuarios\138_DesplegarRESTServerEnRailway``  a la carpeta: ``S8_REST_Server_ConfiguracionesIniciales\113_Respaldo_DelRESTServerAGithub``

1. Preparamos nuestro Staggin Area o nuestros cambios para ser subidos a la rama que en un momento crearemos.

    ```git
    git add . 
    git commit -m "Fin Seccion 9"
    ```

1. Ahora nos vamos a **crear una rama especifica para este despliegue**, con el siguiente comando que nos creara la rama y nos movera a ella.

    ```git
    git checkout -b 2.0.0
    ```
1. Subimos a github **```git push```**

    **>NOTA :** Si nos arroja un error indicandonos que no tenemos una rama en el  origin que se llame **``2.0.0``** lo solucionamos con el comando  **``git push --set-upstream origin 2.0.0``** 


1. Consultamos nuestro la [Rama 2.0.0] creada en nuestro repositorio  

## Configuramos la rama creada [Rama 2.0.0] en nuestro proyecto Railway para que se haga su despliegue automatico.

1. Nos vamos a nuestro proyecto Railway
1. Le damos click en ``Settings`` 
1. En **``Automatic Deployments``** escogemos **``2.0.0``** 
1. Una vez que termine de actualizarse , como ya tenemos configurado su exposicion a internet solo consultamos el url: [restserver] 



---
## Actualizando archivos a la rama 2.0.0 con cambios.

1. Realizamos cambios , por ejemplo cambiaremos el color del mensaje "**ACCESO DENEGADO**" del estatico index.html de color tomato a teal. 
1. Verificamos que estemos en la rama 2.0.0 con el comando : **``git branch``** 
    > **NOTA:** En caso que no estemos en la rama nos cambiamos con el comando **``git switch 2.0.0``** 
3. Preparamos nuestros cmabios **``git add .``** 
4. Subimos nuestros cambios a nuestro stagging area: **``git commit -m "index.html actualizado"``** 
5. Actualizamos la rama 2.0.0 de nuestro repositorio con: **``git push``** 

---
## Eliminamos archivo **``.env``** 

Lo que haremos es en nuestro archivo .gitignore agregamos ``.env`` para que se ignore el archivo ``.env`` 

    ```gitignore
    node_modules/
    .env 
    ```

Y en nuestro repositorio entramos al archivo y lo vaciamos hacemos el commit directo desde el repositorio.

Ahora si consultamos en los logs de railway veremos mensajes de error de conexion a la base datos, etc... 

**¿Como solucionamos esto?**
Bueno pues nos vamos a crear las mismas variables de entorno pero diretamente en Railway


---
## Consultamos desde **POSTMAN**

Recordemos que tenemos variable url para desarrollo y produccion , y para produccion la variable url tiene como valor **``https://curso-node-restserver-fherr-production.up.railway.app``** asi que solo tenemos que hacer la consulta **``GET``** a **``{{url}}/api/usuarios/``** 


# Creamos usuario con **POSTMAN** 

**METHOD:** POST 

**URL:** {{url}}/api/usuarios/

  > **Nota :** la variable {{url}} tiene el valor ``https://curso-node-restserver-fherr-production.up.railway.app/api/usuarios`` 

**Body :** 

  ```json
  {
    "nombre"   : "furio",
    "edad"     : "47",
    "correo"   : "furio@test.com" ,
    "password" : "123456" ,
    "rol"      : "TI_ROLE"
  }
  ```

Obtenemos el resultado : 

  ```json
    {
      "usuario": {
        "nombre": "furio",
        "correo": "furio@test.com",
        "rol": "TI_ROLE",
        "estado": true,
        "google": false,
        "_id": "63977a38acc3c3ac22201daa"
      }
    }
  ```

Ahora si consultamos **``https://curso-node-restserver-fherr-production.up.railway.app/api/usuarios``** y podremos consultar todos los usuarios y entre ellos el que acabamos de crear:

  ```json 
  {
    totalRegistros: 3,
    usuarios: [
      {
        _id       : "630faf675b4daf05d612db04",
        nombre    : "Jeffrey Dammer",
        correo    : "jdammer@serialkiller.com",
        rol       : "VENTAS_ROLE",
        estado    : true,
        google    : false,
      },
      {
        _id       : "63977758acc3c3ac22201da4",
        nombre    : "Test 17",
        correo    : "test17@test.com",
        rol       : "TI_ROLE",
        estado    : true,
        google    : false,
      },
      {
        _id       : "63977a38acc3c3ac22201daa",
        nombre    : "furio",
        correo    : "furio@test.com",
        rol       : "TI_ROLE",
        estado    : true,
        google    : false,
      },
    ],
  }
```

Tambien si consultamos ``Mongo Compass`` obtendremos la misma respuesta!



---

[Rama 2.0.0]:(https://github.com/zamudpoe/curso-node-restserver-fherr/tree/2.0.0)
[restserver]:(https://curso-node-restserver-fherr-production.up.railway.app/)