const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new Schema(
  {
    name: String,
    surname: String,
    password: String,
    email: String,
    role: {
      type: String,
      enum: ["Admin", "User"],
    },
    img: String,
    refreshTokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
)

UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.__v

  return userObject
}

UserSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email })

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) return user
    else return null
  } else {
    return null
  }
}

UserSchema.pre("save", async function (next) {
  const user = this
  const plainPW = user.password

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(plainPW, 10)
  }
  next()
})

module.exports = model("user", UserSchema)