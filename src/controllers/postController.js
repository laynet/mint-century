const postQueries = require("../db/queries.posts.js");

module.exports = {
  index(req, res, next) {
    postQueries.getAllPosts((err, posts) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("posts/index", { posts });
      }
    });
  },
  new(req, res, next) {
    res.render("posts/new");
  },
  create(req, res, next) {
    let newPost = {
      title: req.body.title,
      body: req.body.body
    };

    postQueries.addPost(newPost, (err, post) => {
      if (err) {
        res.redirect(500, "/posts/new");
      } else {
        res.redirect(303, `/posts/${post.id}`);
      }
    });
  },
  show(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      console.log("REQ PARAMS ID ", req.params.id);
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        res.render("posts/show", { post });
      }
    });
  }
};
