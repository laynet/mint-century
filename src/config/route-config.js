module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const postRoutes = require("../routes/posts");
    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(postRoutes);
  }
};
