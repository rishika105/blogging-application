const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
//built in ^

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      //required: true, //on the go create hoga
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/user_avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

//this runs before saving the user
userSchema.pre("save", function (next) {
  const user = this; //points to the user

  if (!user.isModified("password")) return; //password not modified
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static('matchPassword',async function(email, password){
    const user = await this.findOne({email});

    if(!user) throw new Error("User not found!")

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex")

    if(hashedPassword !== userProvidedHash) throw new Error("Incorrect Password")

    // return hashedPassword == userProvidedHash;
    
    return {...user, password: undefined, salt: undefined}
    //remove sensitive info

})

module.exports = mongoose.model("User", userSchema);
