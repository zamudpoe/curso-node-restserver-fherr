# 187 Nuevo despliegue a Railway

## **[ TAREA TERMINADA ]** - Desplegar en Railway

### Pasos para realizar el despliegue: 

1. Previo al despliegue, revisar en que rama estamos con el comando **``git branch``**, como el ultimo despligue que relizamos fue el de **``4.0.0``** es entonces el valor que deberemos ver de la rama actual, antes de cambiarla a la rama **``5.0.0``** 

1. Realizamos los cambios en nuestro repositorio:

    ```git    
    git checkout -b 5.0.0
    git add .
    git commit -m "Fin sección 12 - version 5.0.0"
    ```

1. Crear y subir una rama: ``git push`` (Ese comando dará un error)
    > **NOTA:** Usar el comando en la descripción del error para subir la rama:  ``git push --set-upstream origin 5.0.0``

1. En ``Railway``, seleccionar la ``rama 5.0.0`` para el despliegue automatico.
1. Revisar si hay cambios en variables de entorno necesarias.
1. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo.

## **¡LISTO!**, Ya podemos realizar los **``REQUEST``** dessarrollados para las colecciones **``CATEGORIAS``** , **``PRODUCTOS``** y las **``busquedas``** en **``POSTMAN``** 

--- 
## **_ATENCION_**  

El capitulo donde se debe realizar el despliegue es: **``\S8_REST_Server_ConfiguracionesIniciales\113_Respaldo_DelRESTServerAGithub``** , en esta carpeta debemos 
* **``VACIARLA``**
* Pegar todo el nuevo proyecto a subir
* Levantar el proyecto **``nodemon app.js``** y probar que todo este como se desarrollo en el proyecto actualizado que estamos pegando. 
* Si todo esta bien realizar el despliegue a **Railway**!. 

