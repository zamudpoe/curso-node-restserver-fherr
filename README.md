# Respaldo del RESTServer a Github 

Tenemos que respaldar todo el proyecto a Github , pero adicionalmente antes de subirlo a cualquier lugar, tenemos que quitar lo que son los modulos de node.

Creamos el archivo .gitignore para ignorar archivos y carpetas que no deban subirse a nuestro repositorio de github. 


## PASOS

1. Creacion de archivo ``.gitignore`` , con contenido para ignorar carpeta de ``node_modules/`` 

    ```javascript
    node_modules/ 
    ```

1. Inicializamos nuestro repositorio  
  
    ```javascript
    git init 
    ```
    > **NOTA :**  realizamos un ``git status`` para ver los archivos que seran subidos a nuestro repositorio. 

    ```javascript
    No commits yet
                                                                                            Untracked files:
      (use "git add <file>..." to include in what will be committed)
            .env
            .gitignore
            README.md
            app.js
            controllers/
            models/
            package-lock.json
            package.json
            public/
            routes/

    nothing added to commit but untracked files present (use "git add" to track)
    ```


1. Agregamos los archivos al stage:  

    ```javascript
    git add .
    ```
   
1. preparamos el commit 

    ```javascript
    git commit -m "Primer Commit | Backend basico listo!"
    ```

1. Genial ya tenemos respaldado a nivel local, si el dia de mañana borramos algo y queremos restaurar todo el proyecto al momento del commit , lo unico que tenemos que hacer es:  ``git checkout -- .`` 
