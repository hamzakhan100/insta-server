const Post = require("../../../models/post.model");

exports.createPost = (req, res) => {
	const { title, body, photoEncode, photoType } = req.body;
	if (!title || !body || !photoEncode) {
		return res.json({
			error: "Please submit all the required fields.",
		});
	}
	const post = new Post({
		Title: title,
		Body: body,
		PostedBy: req.user,
	});

	if (photoEncode != null) {
		post.Photo = new Buffer.from(photoEncode, "base64");
		post.PhotoType = photoType;
	}

	post.save()
		.then((result) => {
			res.json({ message: "Post created successfully" });
		})
		.catch((err) => {
			console.log(err);
		});
};