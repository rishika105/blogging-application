const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { generateToken } = require("../utils/authentication");

const userSchema = new mongoose.Schema(
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
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

 return next(); //return beacuse if not modified the next func wont call
});

userSchema.static('matchPasswordAndToken',async function(email, password){
    const user = await this.findOne({email});

    if(!user) throw new Error("User not found!")

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
    .update(password) 
    .digest("hex")

    if(hashedPassword !== userProvidedHash) throw new Error("Incorrect Password")

    // return hashedPassword == userProvidedHash;
    
    // return {...user, password: undefined, salt: undefined}
    // //remove sensitive info
    const token = generateToken(user);
    return token;

})

module.exports = mongoose.model("User", userSchema);
