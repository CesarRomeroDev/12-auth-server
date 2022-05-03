const { Router } = require('express');  //requerimon paquete Router de express
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');


const router = Router();    //función Router

//crear un nuevo usuario
//crearUsuario viene de los controllers auth.js
router.post( '/new', crearUsuario);  //para crear un usuario, creamos el path, esto se conoce como el controlador /new

//Login de usuario
//loginUsuario viene de los controllers auth.js
router.post( '/',[
    check('email', 'El email es obligatorio').isEmail(),      //middeleware
    check('password', 'La contraseña debe de tener 6 caracteres').isLength({min: 6}),   //middeleware
], loginUsuario);

//validar y revalidar token
//validarToken viene de los controllers auth.js
router.get( '/renew', revalidarToken);







//PARA EXPORTAR EN NODE 

module.exports = router;