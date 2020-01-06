const Post = require("./models").Post;

module.exports = {
  getAllPosts(callback) {
    return Post.findAll()
      .then(posts => {
        callback(null, posts);
      })
      .catch(err => {
        callback(err);
      });
  },
  addPost(newPost, callback) {
    console.log("QUERIES ADDPOST RAN");
    return Post.create({
      title: newPost.title,
      body: newPost.body
    })
      .then(post => {
        console.log("QUERIES POST ", post);
        callback(null, post);
      })
      .catch(err => {
        callback(err);
      });
  }
};
