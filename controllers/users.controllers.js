const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const UserModel = require('../models/user.model');

const getUsers = async (req, res = response) => {
    try {
        const {page = 0, limit = 5} = req.query;

        const [count, users] = await Promise.all([
            UserModel.countDocuments({ status: true }), 
            UserModel.find({ status: true }).skip(page * limit).limit(limit)
        ])

        res.json({count, users});
    } catch (error) {
        console.log(error)
    }
}

const getUser = (req, res = response) => {
    console.log(req.query)
    res.json({data: 'get Hello World!'});
}

const postUser = async (req, res = response) => {
    try {
        const {name, email, password, role} = req.body;
        const user = new UserModel({name, email, password, role});
        user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
        await user.save();
        res.json({data: user});
    } catch (error) {
        console.log(error);
    }
}

const putUser = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const { _id, password, google, ...body} = req.body;

        if (password) body.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

        const user = await UserModel.findByIdAndUpdate(id, body)

        res.json({user});
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res = response) => {
    try {
        const {id} = req.params;
        const userAuth = req.userAuth;
        await UserModel.findByIdAndUpdate(id, {status: false});
        res.json({id, userAuth});
    } catch (error) {
        console.log(error)
    }
}




module.exports = { getUsers, getUser, postUser, putUser, deleteUser };