const router = require("express").Router()
const body_parser=require("body-parser");
const { addUniversity } = require("../controllers/university.controller");
const parser=body_parser.json()
let uploader = require("../middlewares/uploader.middleware");


router.route("/university/add")
    .post(parser,uploader.single('profile_pic'),addUniversity)

module.exports = router