const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controllers");
const { validations } = require("../middlewares/validations.middlewares");
const router = Router();

router.post('/login', [
    check('email', 'email invalid').isEmail(),
    check('password', 'password is required').not().isEmpty().isLength({min: 6}),
    validations
], login);

module.exports = router;