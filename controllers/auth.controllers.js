const { response } = require("express");
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user.model");
const { generarToken } = require("../helpers/token-jwt");

const login = async (req, res = response) => {
    try {
        const {email, password} = req.body;

        const user = await UserModel.findOne({email, status: true});
        if(!user) return res.status(400).json({data: 'email or password incorrect'});
        if(!user.status) return res.status(400).json({data: 'email no exist'});

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) return res.status(400).json({data: 'email or password incorrect'});

        const token = await generarToken(user.id);
        res.json({token, user});
    } catch (error) {
        console.log(error)
        return res.status(500).json({data: 'contact the admin'});
    }
}

module.exports = {
    login
}