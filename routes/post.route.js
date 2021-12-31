const controller = require("../controllers/postController/index");

const loginmiddleware = require("../middleware/login.middleware");

module.exports = (app) => {
  // Getting all posts
  app.get("/allpost", loginmiddleware, controller.allPost);

  // // Create a post
  app.post("/createpost", loginmiddleware, controller.createPost);

  // // Like a post
  app.put("/like", loginmiddleware, controller.like);

  // // Unlike a post
  app.put("/Unlike", loginmiddleware, controller.unlike);

  // // Commenting a post
  app.put("/comment", loginmiddleware, controller.comment);
};
