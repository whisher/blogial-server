'use strict';

exports.account = (req, res, next) => {
  res.status(200).json(req.userData);
};
