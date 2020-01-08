const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/application");

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
    const authorized = new Authorizer(req.user).new();
    if (authorized) {
      res.render("posts/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/posts");
    }
  },
  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();
    if (authorized) {
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
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/posts");
    }
  },
  show(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        res.render("posts/show", { post });
      }
    });
  },
  destroy(req, res, next) {
    postQueries.deletePost(req, (err, post) => {
      if (err) {
        res.redirect(err, `/posts/${req.params.id}`);
      } else {
        res.redirect(303, "/posts");
      }
    });
  },
  edit(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user).edit();
        if (authorized) {
          res.render("posts/edit", { post });
        } else {
          req.flash("You are not authorized to do that.");
          res.redirect(`/posts/${req.params.id}`);
        }
      }
    });
  },
  //req or req.params.id??
  update(req, res, next) {
    postQueries.updatePost(req, req.body, (err, post) => {
      if (err || post == null) {
        res.redirect(404, `/posts/${req.params.id}/edit`);
      } else {
        res.redirect(`/posts/${post.id}`);
      }
    });
  }
};
