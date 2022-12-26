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

