const { Router } = require("express");
const { getUsers, postUser, putUser, getUser, deleteUser } = require("../controllers/users.controllers");

const router = Router();

router.get('/', getUsers);

router.get('/user', getUser);

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);


module.exports = router;