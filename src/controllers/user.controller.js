const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  
  const ifUserExists = await userService.findUserByEmailId(req.body.email).catch(() => null);
  if (ifUserExists) {
    return res.status(httpStatus.CONFLICT).send({ message: 'Email already in use' });
  }else{
    req.body.role = 'user';
  }
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsers();
  res.send(result);
});

const findUserByEmailId = catchAsync(async (req, res) => {
  const email = req.params.email;
  const user = await userService.findUserByEmailId(email);
  res.send(user);
});

const userLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.userLogin(email, password);
  res.send(result);
});

const refreshToken= catchAsync(async(req,res)=>{
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Refresh token is required' });
  }
  const user = await userService.getRefreshToken(refreshToken);
  return res.send({ accessToken: user.accessToken });
})

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  await userService.logout(refreshToken);
  res.status(httpStatus.OK).send({ message: 'Logged out successfully' });
});

module.exports = {
  createUser,
  getUsers,
  findUserByEmailId,
  userLogin,
  refreshToken,
  logout
};
