const RoleModel = require("../models/role.model");
const UserModel = require("../models/user.model");

const roleIsValid = async (role = "") => {
    const roleExist = await RoleModel.findOne({role});
    if (!roleExist) throw new Error(`the role ${role} is not a valid role`);
    return true;
}

const emailExist = async (email = "") => {
    const emailExist = await UserModel.findOne({email});
    if (emailExist) throw new Error(`the email ${email} already exist`);
    return true;
}

const userExistById = async (id = "") => {
    const userExist = await UserModel.findById(id);
    if (!userExist) throw new Error(`the id ${id} does not exist`);
    return true;
}

module.exports = { roleIsValid, emailExist, userExistById };