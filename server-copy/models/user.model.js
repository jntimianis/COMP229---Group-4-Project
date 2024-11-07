import mongoose from "mongoose";
import crypto from "crypto";
//const mongoose = require('mongoose');
const concertLovers = new mongoose.Schema({
  concertName: {
    type: String,
    trim: true,
    
  },

  concertPicture: String,
   // trim: true,


  concertPost: {
    type: String,
    trim: true,
    
  },

  customerName: {
    type: String,
    trim: true,
    
  },

  userName: {
    type: String,

    
  },
  password: {
    type: String,
  
    
  },

  customerEmail: {
    type: String,
    trim: true,
   // unique: "Email already exists",
   // match: [/.+\@.+\..+/, "Please fill a valid email address"],
   // required: "Email is required",
  },

  postCreated: {
    type: Date,
    default: Date.now,
  },

  postUpdated: {
    type: Date,
    default: Date.now,
  },

 // hashed_password: {
  //  type: String,
   // required: "Password is required",
  //},
  //salt: String,
});



// concertLovers.virtual("password")
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//     //this.hashed_password = password;

//     //this.salt = this.makeSalt();
//     //this.hashed_password = password;
//     //this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });
//   concertLovers.path("hashed_password").validate(function (v) {
//   if (this._password && this._password.length < 6) {
//     this.invalidate("password", "Password must be at least 6 characters.");
//   }
//   if (this.isNew && !this._password) {
//     this.invalidate("password", "Password is required");
//   }
// }, null);
// concertLovers.methods = {
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },
//   encryptPassword: function (password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
//   makeSalt: function () {
//     return Math.round(new Date().valueOf() * Math.random()) + "";
//   },
// };

//module.exports = mongoose.model('User', concertLovers);
export default mongoose.model("concertLovers", concertLovers);
