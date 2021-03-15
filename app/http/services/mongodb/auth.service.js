const { genSalt, hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

/** Models */
const User = require("../../../models/user.model");
const Login = require("../../../models/login.model");

/** Resources */
const { userResource } = require("../../resources/user.resource");

/** Exceptions */
const { InvalidCredentialsException } = require("../../../exceptions/invalidCredentials.exception");

class AuthService {

  async register(request) {
    const { body } = request;
    const salt = await genSalt(10);
    const password = await hash(body.password, salt);
    const user = new User({ ...body, password });

    return await user.save();
  }

  async login(request) {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new InvalidCredentialsException();
    }

    const expiresIn = {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600
    };
    const token = sign({ sub: user._id }, process.env.JWT_TOKEN_SECRET, expiresIn);
    const login = new Login({ token, userId: user._id });
    await login.save();

    return {
      token,
      ...expiresIn,
      user: userResource(user)
    };
  }

  async logout(request) {
    const token = request.header("token");
    await Login.findOneAndDelete({ token });

    return true;
  }

  async validate(token) {
    const found = await Login.findOne({ token });

    return found ? true : false;
  }
}

module.exports = {
  AuthService
};