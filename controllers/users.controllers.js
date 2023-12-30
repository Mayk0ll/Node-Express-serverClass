const { response, request } = require('express');

const getUsers = (req, res = response) => {
    res.json({data: 'gets Hello World!'});
}

const getUser = (req, res = response) => {
    console.log(req.query)
    res.json({data: 'get Hello World!'});
}

const postUser = (req, res = response) => {
    console.log(req.body)
    res.json({data: 'post Hello World!', body: req.body});
}

const putUser = (req = request, res = response) => {
    res.json({data: 'put Hello World!'});
}

const deleteUser = (req, res = response) => {
    res.json({data: 'delete Hello World!'});
}




module.exports = { getUsers, getUser, postUser, putUser, deleteUser };