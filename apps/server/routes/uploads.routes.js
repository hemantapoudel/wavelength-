const router = require("express").Router()
const { upload_photo } = require("../controllers/upload.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const uploader = require("../middlewares/uploader.middleware")

router.route('/upload')
    .post(isLoggedIn,uploader.single('image'),upload_photo)

module.exports = router