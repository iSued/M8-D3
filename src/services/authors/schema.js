const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema(
  {
    name: String,
    img: String,
  },
  { timestamps: true }
);

module.exports = model("Author", AuthorSchema);
