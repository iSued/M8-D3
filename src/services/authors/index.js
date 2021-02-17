const express = require("express");

const AuthorSchema = require("./schema");

const AuthorsRouter = express.Router();

AuthorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find(req.query);
    res.send(authors);
  } catch (error) {
    next(error);
  }
});

AuthorsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const author = await AuthorSchema.findById(id);
    if (author) {
      res.send(author);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next("While reading authors list a problem occurred!");
  }
});

AuthorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorSchema(req.body);
    const { _id } = await newAuthor.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

AuthorsRouter.put("/:id", async (req, res, next) => {
  try {
    const author = await AuthorSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (author) {
      res.send("Ok");
    } else {
      const error = new Error(`author with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

AuthorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const author = await AuthorSchema.findByIdAndDelete(req.params.id);
    if (author) {
      res.send("Deleted");
    } else {
      const error = new Error(`author with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = AuthorsRouter;
