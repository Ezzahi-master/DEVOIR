const { verifyToken } = require('../utils/token');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const decoded = verifyToken(token);
    const user = await User.findOne({ _id: decoded.id, tokens: token });

    if (!user) {
      throw new Error('Invalid token');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = authMiddleware;