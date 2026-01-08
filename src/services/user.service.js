const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const userData = { ...userBody, 
    password: await bcrypt.hash(userBody.password, 10), 
  };
  return User.create(userData);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  const users = await User.find();
  return users;
};

const findUserByEmailId= async (email) => { 
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
}

const userLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user._id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  await user.save();
  return { user, accessToken, refreshToken };
};

const getRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
    }
    const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    return { accessToken };
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  } 
}

const logout = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid refresh token');
    }
    user.refreshToken = null;
    await user.save();
    return { message: 'Logged out successfully' };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid refresh token');
  }
};  

module.exports = {
  createUser,
  queryUsers,
  findUserByEmailId,
  userLogin,
  getRefreshToken,
  logout
};
