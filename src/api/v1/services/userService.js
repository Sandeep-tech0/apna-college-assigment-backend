const ApiError = require('../middlewares/apiError');
const User = require('../models/User');
const UserValidation = require('../validations/user.js');
const JwtUtils = require('../helpers/jwtUtils');

class UserService {
  async getProfile(id){
    const user = await User.findById(id);
    return user;
  }
  async   loginByEmailPassword(email, password){
    console.log(email, password);
    const user = await User.findOne({
        email: email, isDeleted: false
    })
        .select('firstName lastName email password isActive');
    console.log(user);

    if (!user) {
        throw ApiError.badRequest('Invalid email');
    }
    if (user.password !== password) {
        throw ApiError.badRequest('Invalid password');
    }
    user.password = undefined;
        const token = JwtUtils.getToken(user._doc);

        return {
            user,
            token
        }
  }
  async registerUser(user) {
     console.log(user)
    const foundUserByemail = await User.findOne({email: user.email});
    if (foundUserByemail && foundUserByemail.email == user.email) {
        throw ApiError.badRequest('Email already exists');
    }
    
    UserValidation.insert(user);
    user.password = "123456";
    const newUser = await User.create(user);
    return newUser;
}
}

module.exports = new UserService();