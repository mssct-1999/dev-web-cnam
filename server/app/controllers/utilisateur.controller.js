const db = require("../models");
const Utilisateur = require('../models/utilisateur.model')

/**
 * Fonction: create
 * Description: Création d'un nouvel utilisateur 
 */
exports.create = async (req,res) => {
    try {
        const user = new Utilisateur({
            nom:"Massicot",
            prenom: "Hélène",
            login: "hmassicot",
            password: "helenemassicot",
            is_admin:true
        });
        let data = await user.save();
        res.status(201).json({data});
    }
    catch(err) {
        res.status(400).json({err:err})
    }
};

exports.findAll = (req,res) => {

};

/**
 * Fonction: loginUser
 * Description: Authentification utilisateur
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.loginUser = async (req,res) => {
    try {
        const login = req.body.login;
        const password = req.body.password;
        const user = await Utilisateur.findByCredentials(login,password);
        console.log("(Utilisateur.controller.loginUser) - Utilisateur retourné : " + user);
        if (!user) {
            return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({err: err});
    }
};