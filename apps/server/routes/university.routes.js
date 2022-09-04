const router = require("express").Router()
const body_parser=require("body-parser");
const { addUniversity, showUniversity, listUniversities, updateUniversity, deleteUniveristy } = require("../controllers/university.controller");
const { isLoggedIn } = require("../middlewares/logincheck.middleware");
const parser=body_parser.json()
let uploader = require("../middlewares/uploader.middleware");


router.route("/university/add")
    .post(isLoggedIn,parser,uploader.single('profile_pic'),addUniversity)
router.route("/university/listall")
    .get(listUniversities)
router.route("/university/:id")
    .get(showUniversity)
router.route("/university/update/:id")
    .put(isLoggedIn,parser,uploader.single('cover_pic'),updateUniversity)
router.route("/university/delete/:id")
    .delete(isLoggedIn,parser,deleteUniveristy)

module.exports = router