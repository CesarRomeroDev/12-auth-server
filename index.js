const express = require('express');  //requerimos paquete de express
const res = require('express/lib/response');
const cors = require('cors'); //CORS es un paquete de node.js para proporcionar un middleware Connect / Express que se puede usar para habilitar CORS con varias opciones.
require('dotenv').config();

// console.log( process.env );

// Crear el servidor/ aplicación de express
const app = express();

//directorio Publico carpeta public
app.use( express.static('public') );

// app.get('/', (req, res) => {        //cuand yo haga una peticion al / , se va ejecutar el callback
//     res.json({                      //vamos a responder a este objeto como ejemplo
//         ok: true,
//         msg: 'todo salio bien',
//         uid: 1234
//     })
// });
//cors
app.use( cors() )
//lectura y parseo del body
app.use( express.json() );
//peticion GET
//peticion GET
//Los estatus 200 todo se hizo correctamente
//404 los recursos no se encontraron
//500 problemas internos del servidor
//Rutas
app.use( '/api/auth', require('./routes/auth') )  //cada ruta que se encuentre en require, va a tener el path: /api/auth

/**
 * levantar aplicacion de express
 * el puerto es 4000, esto puede cambiar cuando el servicio de hosting te indica a que puerto conectarte.
 * EL PORT viene de .env
 */
app.listen(process.env.PORT, () => {    //escuchamos el puerto 4000 y se ejecuta el callback despues que se ejecute nuetra direccion
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`); 
});