const Post = require("../../../models/post.model");

exports.like = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,

    {
      $push: { Likes: req.user._id },
    },

    { new: true }
  )
    .populate("PostedBy", "_id Name")
    .populate("Comments.PostedBy", "_id Name")
    .exec((err, result) => {
      if (err) return res.status(422).json({ Error: err });
      else {
        res.json({
          _id: result._id,
          Title: result.Title,
          Body: result.Body,
          PostedBy: result.PostedBy,
          Photo: result.Photo.toString("base64"),
          PhotoType: result.PhotoType,
          Likes: result.Likes,
          Comments: result.Comments,
        });
      }
    });
};
