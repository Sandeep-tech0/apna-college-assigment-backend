const Response = require("../middlewares/response");
const UserService = require("../services/userService.js");

async function registerUser(req, res) {
  try {
    const user = await UserService.registerUser(req.body);
    return Response.success(res, "User created successfully", user);
  } catch (error) {
    return Response.error(res, error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginByEmailPassword(email, password);
    return Response.success(res, "User logged in successfully", user);
  } catch (error) {
    return Response.error(res, error);
  }
}




module.exports = {
  login,
  registerUser,
};
