const { Router } = require("express");
const { check } = require("express-validator");

// const { validateJWT } = require("../middlewares/validateJWT.middlewares");
// const { validations } = require("../middlewares/validations.middlewares");
// const { validateRoleAdmin, validateRole } = require("../middlewares/validateRoles.middlewares");
const { validateJWT, validations, validateRoleAdmin, validateRole } = require("../middlewares/index");

const { roleIsValid, emailExist, userExistById } = require("../helpers/db-validators");
const { getUsers, postUser, putUser, getUser, deleteUser } = require("../controllers/users.controllers");

const router = Router();

router.get('/', [
    validateJWT,
    validateRole('ADMIN_ROLE', 'SALES_ROLE') // DEVUELVE UNA FUNCION, YA QUE LOS MIDDLEWARES SON FIONES EN REFENCIA
], getUsers);

router.get('/:id', [
    check('id', 'id invalid').isMongoId().custom( userExistById ),
    validations
], getUser);

router.post('/', [
    // check('role', 'role invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email invalid').isEmail().custom( emailExist ),
    check('password', 'password must be at least 6 characters').not().isEmpty(),
    check('role').custom( roleIsValid ),
    validations
], postUser);

router.put('/:id', [
    check('id', 'id invalid').isMongoId().custom( userExistById ),
    check('role').custom( roleIsValid ),
    validations
], putUser);

router.delete('/:id', [
    validateJWT,
    validateRoleAdmin,
    check('id', 'id invalid').isMongoId().custom( userExistById ),
    validations
], deleteUser);


module.exports = router;