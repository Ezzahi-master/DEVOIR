const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

class AuthService {
  async register(username, password) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }
    
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    return user;
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    const token = generateToken(user._id);
    user.tokens.push(token);
    await user.save();
    
    return { user, token };
  }

  async logout(user, token) {
    user.tokens = user.tokens.filter(t => t !== token);
    await user.save();
  }
}

module.exports = new AuthService();