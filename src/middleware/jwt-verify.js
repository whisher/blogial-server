'use strict';
const jwt = require('jsonwebtoken');

const config = require('../config/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, config.secret);
    req.userData = {
      avatar: decodedToken.avatar,
      display_name: decodedToken.display_name,
      email: decodedToken.email,
      role: decodedToken.role,
      userId: decodedToken.userId,
      username: decodedToken.username
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated' });
  }
};
