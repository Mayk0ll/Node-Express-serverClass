
const validateJWT = require("../middlewares/validateJWT.middlewares");
const validations = require("../middlewares/validations.middlewares");
const validateRoles = require("../middlewares/validateRoles.middlewares");

module.exports = {
    ...validateJWT,
    ...validations,
    ...validateRoles
}

