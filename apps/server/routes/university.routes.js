const router = require("express").Router()
const body_parser=require("body-parser");
const { addUniversity, showUniversity, listUniversities, updateUniversity, deleteUniveristy } = require("../controllers/university.controller");
const parser=body_parser.json()
let uploader = require("../middlewares/uploader.middleware");


router.route("/university/add")
    .post(parser,uploader.single('profile_pic'),addUniversity)
router.route("/university/listall")
    .get(listUniversities)
router.route("/university/:id")
    .get(showUniversity)
router.route("/university/update/:id")
    .put(uploader.single('cover_pic'),updateUniversity)
router.route("/university/delete/:id")
    .delete(deleteUniveristy)

module.exports = router