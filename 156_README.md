# **156** Nuevo despliegue a Railway

## **Tarea - Desplegar en Railway**

Los quiero invitar a que intenten hacer el despliegue de su aplicación a Railway por su cuenta.

## **Pasos que les pueden ayudar:**

1. Cambios en su repositorio

    ```
    git checkout -b 3.0.0

    git add .

    git commit -m "Fin sección 10 - version 3.0.0"
    ```

1. Crear y subir una rama

    ```
    git push
    ```
    __(Ese comando dará un error)__

    __Usar el comando en la descripción del error para subir la rama.__ .

    > **ERROR :** 
    

    ```
    fatal: The current branch 3.0.0 has no upstream branch.
    To push the current branch and set the remote as upstream, use

      git push --set-upstream origin 3.0.0
    ```

    LSITO lo que tenemos que hacer es ejecutar el comando que se nos muestra en el mensaje:  ``git push --set-upstream origin 3.0.0``


1. En **Railway**, seleccionar la rama **3.0.0** para desplegar

1. Revisar si hay cambios en variables de entorno necesarias

1. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo.


Mucha suerte!


--- 
## MI SOLUCION 

Vamos a agregar este archivo readme con el nombre de **156_README.md**, en la ruta donde esta la conexion a nuestro repositorio que es:  **``S8_REST_Server_ConfiguracionesIniciales\113_Respaldo_DelRESTServerAGithub``** 

Y asi si deseamos agregar cualquier otro cambio debemos de trasladar a esa carpeta los archivos involucrados con el cambio!... agreguemos otro mas... vamos a cambiar el mensaje del index.html a un color orange. 

NOS COPIAMOS TODO DE LA CARPETA DESTINO , Y REALIZAMOS CAMBIOS. 





