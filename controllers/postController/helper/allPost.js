const Post = require("../../../models/post.model");

exports.allPost = (req, res) => {
  Post.find()
    .populate("PostedBy", "_id Name")
    .populate("Comments.PostedBy", "_id Name")
    .sort("-createdAt")
    .then((data) => {
      let posts = [];
      data.map((item) => {
        posts.push({
          _id: item._id,
          Title: item.Title,
          Body: item.Body,
          PostedBy: item.PostedBy,
          Photo: item.Photo.toString("base64"),
          PhotoType: item.PhotoType,
          Likes: item.Likes,
          Comments: item.Comments,
        });
      });
      res.json({ posts });
     
    })
    .catch((err) => {
      console.log(err);
    });
};
