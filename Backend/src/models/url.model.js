const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  mainUrl: { type: String, required: true },
  name: { type: String, required: true },
  userId:{type:mongoose.Schema.Types.ObjectId, ref: "user", required: true},
created:{type:String,default:Date.now()}
},
{
  timestamps:true,
  versionKey:false
});

module.exports = mongoose.model("url", UrlSchema);
