const jwt = require("jsonwebtoken");
const { User, validationNewUser } = require("../../models/user");

//create new token
const createToken = (_id, isAdmin) => {
  return jwt.sign({ _id: _id, isAdmin: isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const signupUser = async (req, res) => {
  /********************* FIRST METHODE ******************/

  const { error } = validationNewUser.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { firstName, lastName, birthday, email, password, gender, isAdmin } =
    req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      birthday,
      email,
      password,
      gender,
      isAdmin
    );

    //create token
    const token = createToken(user._id, user.isAdmin);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser };
