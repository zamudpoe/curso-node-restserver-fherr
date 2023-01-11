# 208 Nuevo despliegue a Railway

## **Tarea** - Desplegar en Railway

Los quiero invitar a que intenten hacer el despliegue de su aplicación a Railway por su cuenta.

## Pasos que les pueden ayudar:

1. Cambios en su repositorio

    ```git
    git checkout -b 6.0.0
    git add .
    git commit -m "Fin sección 13 - version 6.0.0"
    ```

1. Crear y subir una rama

    ``git push``

    (Ese comando dará un error)

    Usar el comando en la descripción del error para subir la rama.

1. En Railway, seleccionar la rama 6.0.0 para desplegar

1. Revisar si hay cambios en variables de entorno necesarias

1. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo.

Mucha suerte!

----
# **MI SOLUCION**


1. Nos vamos al directorio **``S8_REST_Server_ConfiguracionesIniciales\113_Respaldo_DelRESTServerAGithub``** que es desde donde hago los despliegues a Railway subiendo mis cambios a mi repositorio "[github/zamudpoe]" 
1. Consultamos la rama actual , que debe ser la 5 , ya que fue la ultima que subimos. esto lo reailzamos con el comando **``git branch``** : 

    ```git
    > git branch
    2.0.0
    3.0.0
    4.0.0
    * 5.0.0
    main
    ```

1. Una vez que confirmamos que estamos en la rama 5, procedemos a realizar la tarea que nos pide Fernando Herrera.

---
## Realizacion de tarea.

1. Preparamos y confirmamos nuestros cambios a nuestro repositorio Git (local). primero creando la rama 6.0.0 , despues consultando la rama donde estamos parados que es la creada, despues subimos nuestros cambios al ``staging area`` , despues pasamos nuestros cambios del **``staging area``** a nuestro **``repositorio Git``**. a esto ultimo se le conoce como que nuestros cambios ya estan confirmados.

    ```git
    git checkout -b 6.0.0
    git branch
    git add .
    git commit -m "Fin sección 13 - version 6.0.0"
    ```
    > Una vez que el código esta **confirmado** ya esta listo para sincronizarse con el servidor de Git (github, bitbucket,etc).


1. Crear y subir una rama 6.0.0  
    ```git
    git push
    ```
    > (Ese comando dará un error) : Asi que debemos usar el comando en la descripción del error para subir la rama.

    El error que nos arrojara es el siguiente: 

    ```error
    fatal: The current branch 6.0.0 has no upstream branch.
    To push the current branch and set the remote as upstream, use

        git push --set-upstream origin 6.0.0
    ```

    Usamos el comando ``git push --set-upstream origin 6.0.0`` para subir a nuestro **servidor de Git (github, bitbucket,etc)** , una vez que termina de subir nuestros cambios, podemos consultar en nuestro repositorio Github [github.com/zamudpoe/tree/6.0.0] y ahi apreciaremos que ya esta creada la rama **``6.0.0``**.

    Una vez que realizamos este comando , posteriormente podemos utilizar **``git push``** 

1. En [Railway], seleccionar la rama 6.0.0 para realizar el deploy desde [github.com/zamudpoe/tree/6.0.0]. 

1. Revisar si hay cambios en **variables de entorno** necesarias. **> NOTA:** recordemos que tenemos una variable de entorno para **cloudinary** que es ``CLOUDINARY_URL`` , no olvidemos de añadirla en railway. 

1. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo.

--- 
## LISTO!!!

Ya hemos realizado la tarea subiendo nuestros cambios con el readme208.md hasta a medias , ahora hay que pegar todo de nuestro codigo de: 

**``S13_Carga_Y_ProteccionDeArchivos\207_DespliegueEnRailway``** 

> **Nota :** Primero hay que vacias el directorio para que no nos suba copias de carpetas y archivos.

a: 

**``S8_REST_Server_ConfiguracionesIniciales\113_Respaldo_DelRESTServerAGithub``** 

y despues realizar todo el proceso para subir nuestros cambios a nuestro repositorio Github y realizar el despliegue automatico a Railway.

--- 
[github/zamudpoe]:(https://github.com/zamudpoe/curso-node-restserver-fherr/tree/5.0.0)
[github.com/zamudpoe/tree/6.0.0]:(https://github.com/zamudpoe/curso-node-restserver-udemy-fherr.git)
[Railway]:(https://railway.app/project/e1aafa57-1251-4bf8-9953-66195e5f2230/service/5401c168-fa80-4d7b-8281-c6507ba978e9/settings)