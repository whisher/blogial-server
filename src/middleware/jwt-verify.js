'use strict';
const jwt = require('jsonwebtoken');

const config = require('../config/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, config.secret);
    req.userData = {
      _id: decodedToken._id,
      avatar: decodedToken.avatar,
      display_name: decodedToken.display_name,
      email: decodedToken.email,
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname,
      last_login: decodedToken.last_login,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated' });
  }
};
