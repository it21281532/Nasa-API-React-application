const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema1 = new Schema({
   Fullname : {
    type : String,
    required : true
   },
   Email : {
      type : String,
      required : true
   },
   JobStatus : {
      type : String,
      required : true
   },
   Password : {
      type : String,
      required : true
   }

})

const User1 = mongoose.model("user1",userSchema1);
module.exports = User1;