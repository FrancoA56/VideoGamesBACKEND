<h1 align="center">BACK END app --> Videogames.</h1>

<h4>Una SPA que consume datos de una API externa, y permite la visualización de información general y detallada de más de 500,000 videojuegos, entre las funcionalidades que dispone esta APP está el filtrar y ordenar videojuegos por diferentes variables como género, plataformas, nombre, calificación, además de la creación de nuevos videojuegos, mediante un formulario controlado.</h4>

<h4>Para iniciar el servidor es necesario instalar las dependencias (npm install), completar el archivo .env, crear una base de datos de postgreSQL que se llame videogames, luego levantar la aplicacion (npm start) y hacer una peticion del tipo GET a través de Insomnia o Postman. Recuerda que este es solo el servidor, el cliente esta en el repositorio VideoGamesFRONTEND</h4>

<h4>Para realizar la peticion GET puedes seguir los siguientes pasos:</h4> 

<h5>Crea una peticion del tipo GET al [PORT=3001]</h5>
<h5>En la URL ingresa: http://localhost:3001/genres</h5>
<h5>Enviala, una vez la peticion se haya creado exitosamente (200) ya pueden levantar el Front y utilizar la APP a gusto!</h5>

<h4>Para completar el archivo .env puedes seguir los siguientes pasos:</h4> 

<h5>DB_USER=*  // Reemplaza el asterisco por tu nombre de usuario en PostgreSQL, su valor predeterminado es postgres |</h5>
<h5>DB_PASSWORD=*  // Reemplaza el asterisco por tu contraseña de PostgreSQL |</h5>
<h5>DB_HOST=localhost:*  // Reemplaza el asterisco por tu puerto de PostgreSQL, su valor predeterminado es 5432 |</h5>
<h5>PORT=3001</h5>
