const { request, response } = require("express")


const validateRoleAdmin = (req = request, res = response, next) => !req.userAuth || req.userAuth.role !== 'ADMIN_ROLE' ? res.status(401).json({msg: 'Unauthorized'}) : next();

const validateRole = (...roles) => {
    return (req = request, res = response, next) => {
        !req.userAuth || !roles.includes(req.userAuth.role) ? res.status(401).json({msg: 'user Unauthorized'}) : next();
    } 

}


module.exports = {
    validateRoleAdmin,
    validateRole
}