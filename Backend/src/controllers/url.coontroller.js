const express = require("express");
const router = express.Router();
const Url = require("../models/url.model");
const authenticate=require("../middleware/authenticate")

router.post("/",authenticate, async (req, res) => {
  try {
    // console.log(req.body,req.user._id)
    req.body.userId=req.user._id
    let url = await Url.create(req.body);
    return res.status(201).send({ url: `http://localhost:4000/${url.name}` });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    let url = await Url.findOne({ name: req.params.name }).lean().exec();
    console.log(typeof (+url.created))
if(new Date().getTime()-(+url.created)<=1000*3600*48){
  res.redirect(`${url.mainUrl}`);
}
// res.redirect(`${url.mainUrl}`);
  } catch (error) {
    return error;
  }
});
router.get("/",authenticate, async (req, res) => {
  try {
    console.log(req.user)
    let url = await Url.find({id:req.user._id}).lean().exec();
console.log(url)
    return res.status(200).send(url)
  } catch (error) {
    return error;
  }
});


module.exports = router;
