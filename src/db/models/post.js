"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define(
    "Post",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};
