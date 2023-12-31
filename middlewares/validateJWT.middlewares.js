const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if ( !token ) return res.status(401).json({data: 'no token in request'});

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const userAuth = await UserModel.findOne({_id: uid, status: true});
        if(!userAuth) return res.status(401).json({data: 'user admin not authorized'});
        req.userAuth = userAuth;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({data: 'invalid token'});
    }
}

module.exports = {
    validateJWT
}