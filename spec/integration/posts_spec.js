const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts/";
const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;

describe("routes : posts", () => {
  beforeEach(done => {
    this.post;
    sequelize.sync({ force: true }).then(res => {
      Post.create({
        title: "Snowball Fighting",
        body: "So much snow!"
      })
        .then(post => {
          this.post = post;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("GET /posts", () => {
    it("should return a status code 200 and all posts", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Snowball Fighting");

        done();
      });
    });
  });
  describe("GET /posts/new", () => {
    it("should render a new post form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Post");
        done();
      });
    });
  });
  describe("POST /posts/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Watching snow melt",
        body:
          "Without a doubt my favorite things to do beside watching paint dry!"
      }
    };
    it("should create a new post and redirect", done => {
      request.post(options, (err, res, body) => {
        Post.findOne({ where: { title: "Watching snow melt" } })
          .then(post => {
            expect(res.statusCode).toBe(303);

            expect(post.title).toBe("Watching snow melt");
            expect(post.body).toBe(
              "Without a doubt my favorite things to do beside watching paint dry!"
            );

            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe("GET /posts/:id", () => {
    it("should render a view with the selected post", done => {
      request.get(`${base}${this.post.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Snowball Fighting");
        done();
      });
    });
  });
});
