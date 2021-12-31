const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../../models/user.model");

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // Verification for an empty field
  if (!email || !password) {
    return res.status(401).json({ error: "Please provide Email or Password" });
  }
  // Check if email exist in our DB
  User.findOne({ Email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(401).json({ error: "Invalid Email or Password" });
      }
      bcrypt.compare(password, savedUser.Password).then((doMatch) => {
        if (doMatch) {
          // we will generate the token based on the ID of user
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          // retrieve the user info details and send it to the front
          const { _id, Name, Email, Followers, Following, Bookmarks } =
            savedUser;
          res.json({
            token,
            user: { _id, Name, Email, Followers, Following, Bookmarks },
          });
        } else {
          return res.status(401).json({
            error: "Invalid Email or Password",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
