const bcrypt = require("bcryptjs");


const User = require("../../../models/user.model");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  // Verifying if one of the fields is Empty
  if (!name || !password || !email) {
    return res.json({ error: "Please submit all required field" });
  }
  //  we search the user with the credentials submitted
  User.findOne({ Email: email })
    .then((savedUser) => {
      // Verify if the user exist in the DB
      if (savedUser) {
        return res.json({ error: "This Email Is Already Used !" });
      }
      // Hash the pwd before save into DB, more the number is high more it's more secure
      bcrypt.hash(password, 12).then((hashedPwd) => {
        const user = new User({
          Name: name,
          Email: email,
          Password: hashedPwd,
        });
        // We save our new user to DB
        user
          .save()
          .then((user) => {
           
            res.json({ message: "Saved successfully " });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
