const Users = require("../repository/users");

const registration = async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res
      .status(HttpCode.CONFLICT)
      .json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email is already use'
    })
  }
  try {
    const newUser = await User.create({ name, email, password, gender })
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email:newUser.email
      }
    })
  }
  res.json;
};
