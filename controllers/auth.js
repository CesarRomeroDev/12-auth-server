const { response } = require('express');  //para adquirir el tipado
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT  } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { email, name, password } = req.body;

    try {
        //VERIFICAR EL EMAIL
        const usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msj: 'El usuario ya existe con ese email'
            });
        }
        //CREAR USUARIO CON EL MODELO
        const dbUser = new Usuario( req.body );
        //HASHEAR LA CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt )
        //CONECTAR EL JWT
        const token = await generarJWT(dbUser.id, name);
        //CREAR USUARIO DE DB
        await dbUser.save();
        //GENERAR RESPUESTA EXITOSA
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'Por favor hable con el administrador'
        });
    }


}

const loginUsuario = async(req, res) => {

    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ email });
        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }
        //confirmar si el passwor hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            })
        }
        //generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);
        //respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

//exportamos nuestras funciones para las rutas de auth.js
module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
}