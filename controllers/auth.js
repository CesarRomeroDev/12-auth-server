const { response } = require('express');  //para adquirir el tipado
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {   

    const { email, name, password } = req.body
    console.log( email, name, password );

    return res.json({
        ok: true,
        msj: 'Crear usuario /new'
    })
}

const loginUsuario = (req, res) => {

    const errors = validationResult( req );
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { email, password } = req.body
    console.log( email, password );

    return res.json({
        ok: true,
        msj: 'Login de usuario /'
    })
}

const revalidarToken = (req, res) => {

    return res.json({
        ok: true,
        msj: 'Renew /'
    })
}

//exportamos nuestras funciones para las rutas de auth.js
module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
}