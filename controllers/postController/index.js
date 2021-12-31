const { allPost } = require("./helper/allPost");
const { comment } = require("./helper/comment");
const { createPost } = require("./helper/createPost");
const { like } = require("./helper/like");
const { unlike } = require("./helper/unlike");

module.exports = {
  allPost: allPost,
  comment: comment,
  createPost: createPost,
  like: like,
  unlike: unlike,
};
