const { genSalt, hash } = require("bcrypt");

/** Models */
const User = require("../../../models/user.model");

/** Exceptions */
const { ModelNotFoundException } = require("../../../exceptions/modelNotFound.exception");

class UserService {

  async index(request) {
    const { name = "", email = "" } = request.query;

    return await User.find({
      name: { $regex: name, $options: "i" },
      email: { $regex: email, $options: "i" }
    }).sort({ name: "asc"});
  }

  async store(request) {
    const { body } = request;
    const random = Math.random().toString(36).substr(2);
    const salt = await genSalt(10);
    const password = await hash(random, salt);
    const user = new User({ ...body, password });

    return await user.save();
  }

  async show(request) {
    const user = await User.findById(request.params.id);
    
    if (!user) {
      throw new ModelNotFoundException("Usuario no encontrado");
    }

    return user;
  }

  async update(request) {
    const user = await this.show(request);

    user.set(request.body);
    
    return user.save();
  }

  async destroy(request) {
    const user = await this.show(request);

    return await user.delete();
  }
}

module.exports = {
  UserService
};