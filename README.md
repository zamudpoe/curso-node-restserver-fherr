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
    > NOTA : relizamos un ``git status``  para ver el estado de nuestro proyecto. 


    ```unix 
    On branch Master                                                                         
    No commits yet
                                                                                            Changes to be committed:
      (use "git rm --cached <file>..." to unstage)
            new file:   .env
            new file:   .gitignore
            new file:   README.md
            new file:   app.js
            new file:   controllers/usuarios.controllers.js
            new file:   models/server.js
            new file:   package-lock.json
            new file:   package.json
            new file:   public/index.html
            new file:   routes/usuarios.routes.js
    ```
   
1. preparamos el commit 

    > **NOTA :** Realizamos una consulta al log de commits antes de hacer el commit : ``git log`` 

    Nos aparecera : ``fatal: your current branch 'master' does not have any commits yet``

    ```javascript
    git commit -m "Primer Commit | Backend basico listo!"
    ```

    Visualizaremos esta informacion : 
    
    ```javascript
    [master (root-commit) 52091e6] Primer Commit | Backend basico listo!
    10 files changed, 1342 insertions(+)
    create mode 100644 .env
    create mode 100644 .gitignore
    create mode 100644 README.md
    create mode 100644 app.js
    create mode 100644 controllers/usuarios.controllers.js
    create mode 100644 models/server.js
    create mode 100644 package-lock.json
    create mode 100644 package.json
    create mode 100644 public/index.html
    create mode 100644 routes/usuarios.routes.js
    ```

    Consultamos el log de nuevo : ``git log`` , ahora ya nos mostrara informacion de quien realiza el commit , etc: 

    ```unix
    commit 52091e612c3630af9e16a504539a169c257b6d54 (HEAD -> master)
    Author: Ing.Engelbert Zamudio Ponzzi <zamudpoe@gmail.com>
    Date:   Thu Jul 21 23:30:02 2022 -0500

        Primer Commit | Backend basico listo!
    ```

3. Genial ya tenemos respaldado a nivel local, si el dia de mañana borramos algo y queremos restaurar todo el proyecto al momento del commit , lo unico que tenemos que hacer es:  ``git checkout -- .`` y todo el proyecto se restaurara al primer commit. 


--- 

## CREAR NUEVO REPOSITORIO EN [GITHUB] 

Creamos un nuevo repositorio publico: 

* Nombre : **``curso-node-restserver-udemy-fherr``** 
* Descripcion : **``"Curso de Node - Rest Server Básico"``** 
  
Creamos el repositorio , nos arrojara la informacion siguiente: 


### **…Creando un nuevo repositorio en la linea de comando**

  ```unix
  echo "# curso-node-restserver-udemy-fherr" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M "main"
  git remote add origin https://github.com/zamudpoe/curso-node-restserver-udemy-fherr.git
  git push -u origin "main"
  ```

### ...ó **``push`` a un repositorio existente desde la linea de comando** 

  ```unix
  git remote add origin https://github.com/zamudpoe/curso-node-restserver-udemy-fherr.git
  git branch -M  "main"
  git push -u origin "main"
  ```

--- 
## WebServer + RESTServer 

Recuerden que deben de ejecutar ```npm install``` para reconstruir los modulos de Node. 

--- 
## Release Tag.  

### Etiqueta con version anotada 

* ```git tag -a v1.0.0 -m "Fin de seccion 8"``` 
* ```git push --tags``` 


Recargamos el navegador: [https://github.com/zamudpoe/curso-node-restserver-udemy-fherr] 

Y podremos ver que ya tenemos nuestro primer release tag, si le damos click [https://github.com/zamudpoe/curso-node-restserver-udemy-fherr/tags] podremos ver la descripcion 


Le damos click donde dice releases y le damos crear y elejimos los datos de version ``v1.0.0`` con titulo : **"RestServer + WebServer"** y la descripcion **"Configuraciones iniciales listas"** 

y listo ya tenemos nuestro _**primer release tag**_  
--- 
[GITHUB]:(http://github.com)
[https://github.com/zamudpoe/curso-node-restserver-udemy-fherr]:(https://github.com/zamudpoe/curso-node-restserver-udemy-fherr)
[https://github.com/zamudpoe/curso-node-restserver-udemy-fherr/tags]:(https://github.com/zamudpoe/curso-node-restserver-udemy-fherr/tags)
