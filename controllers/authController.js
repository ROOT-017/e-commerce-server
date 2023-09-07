const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.protect = catchAsync(async (req, res, next) => {});
exports.signup = catchAsync(async (req, res, next) => {});
exports.login = catchAsync(async (req, res, next) => {});
exports.logout = (req, res) => {};
