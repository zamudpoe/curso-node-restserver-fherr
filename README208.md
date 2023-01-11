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

1. 







--- 
[github/zamudpoe]:(https://github.com/zamudpoe/curso-node-restserver-fherr/tree/5.0.0)
