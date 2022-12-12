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


---

