const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;

describe("Post", () => {
  beforeEach(done => {
    this.post;
    sequelize.sync({ force: true }).then(res => {
      Post.create({
        title: "My first visit to Proxima Centauri b",
        body: "I saw some rocks"
      })
        .then(post => {
          this.post = post;
          done();
        })
        .catch(Err => {
          console.log(err);
          done();
        });
    });
  });
  describe("#create()", () => {
    it("Should create a post object with a title and body", done => {
      Post.create({
        title: "Pros of cryosleep during the long journey",
        body: "1. Not having to answer the 'are we there yet?' question"
      })
        .then(post => {
          expect(post.title).toBe("Pros of cryosleep during the long journey");
          expect(post.body).toBe(
            "1. Not having to answer the 'are we there yet?' question"
          );
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create a post with missing title or body", () => {
      Post.create({
        title: "Pros of cryosleep during the long journey"
      })
        .then(post => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Post.body cannot be null");
        });
    });
  });
});
