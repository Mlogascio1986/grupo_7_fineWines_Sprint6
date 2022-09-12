const path = require('path')
const fs = require('fs');
const jsonDB = require('../model/jsonDatabase.js');
//const userModel = jsonDB('users')
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const cookies = require('cookie-parser');
const { User, sequelize } = require("../database/models");
const db = require('../database/models');
const {Op} = require('sequelize')

//Objeto literal userController
//Viene de userRouter a cada modulo

const userController = {

    login: (req, res) => {
        res.render('users/login.ejs');
    },

	loginProcess: async (req, res) => {
		console.log("llego al proceso de login")
		//let userToLogin = userModel.findFirstByField("email", req.body.email)
        try{
            const userToLogin = await db.User.findOne({
                where: {
                    email :  {[Op.eq] : req.body.email}
                 },
            })} 
        catch (error) {res.json(error.message) }


		//console.log(req.body.nombreUsuario)
		console.log(userToLogin)
// dos problemas: 1. no encuentra el user.

		if(userToLogin){
			console.log("llego al if con userToLogin = true")
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
			
			if(isOkThePassword){
				// borro la psw para que no quede en las cookies
				delete userToLogin.password;
				// en el request, en session genero una propiedad que se va a llamar 
				//creo userLogged en session con la informacion del usuario
				req.session.userLogged = userToLogin
                //si recordarme esta selected mando cookie con email/nombreUsuario
                if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
				return res.render('users/profile.ejs', {user: req.session.userLogged})
			}}
			return res.render('users/login.ejs',{errors: 
													{credenciales: 
														{msg: 'Las credenciales son invalidas'}}})
	},

	logout: (req,res) => {
        res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/')
	},

	profile: (req,res) => {
		res.render('users/profile.ejs', {
            user: req.session.userLogged
        })

	},

    register:(req, res) => {
        res.render('users/register.ejs');
    },
	processRegister: async (req, res) => {

        const countries = ["Argentina", "Uruguay", "Paraguay", "Chile", "Bolivia", "Perú", "Brasil", "Ecuador", "Venezuela", "Colombia"]; 

        const { file } = req;

        const errores = validationResult(req);

        if(!errores.isEmpty()){
            if(file){
                const filePath = path.join(__dirname, `../../public/images/users/${file.filename}`);
                fs.unlinkSync(filePath);
            }

            console.log(req.body);

            delete req.body.password;   
            delete req.body.confirmPassword;

            console.log(req.body);

            return res.render("./users/register", {
                errors: errores.mapped(),
                oldData: req.body,
                
            })
        }
        
        //const existeEmail = userModel.findFirstByField("email", req.body.email);

        try{
            const existeEmail = await db.User.findOne({
                where: {
                    email :  {[Op.eq] : req.body.email}
                 },
            })} 
        catch (error) {res.json(error.message) }

        if(existeEmail){
            if(file){
                const filePath = path.join(__dirname, `../../public/images/users/${file.filename}`);
                fs.unlinkSync(filePath);
            }

            const error = {
                email: {
                    msg: "Este email ya está registrado"
                }
            }

            return res.render("./users/register", {
                errors: error,
                oldData: req.body,
                
            })
        }

        delete req.body.confirmPassword;

        /*const newUsuario = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: file ? file.filename : "default-user.png"
        };*/
        
        try {   
            const image = file ? file.filename : "default-user.png"
            User.create({
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    nombreUsuario: req.body.nombreUsuario,
                    email: req.body.email,
                    domicilio: req.body.domicilio,
                    password: req.body.password,
                    image: image,
                    idRol: 1
                });
        } catch (error) {
            res.json(error.message)}

        return res.redirect("/user/login");
    }
}

module.exports = userController