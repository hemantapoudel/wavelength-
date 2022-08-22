const router = require("express").Router()
const body_parser = require("body-parser")
const { addNotice, updateNotice, listAllNotices, fetchNotice, deleteNotice } = require("../controllers/notice.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()

router.route("/notice/add")
    .post(parser,addNotice)
router.route('/notice/update/:id')
    .put(parser,updateNotice)
router.route('/notice/listall')
    .get(parser,listAllNotices)
router.route('/notice/fetch/:id')
    .get(parser,fetchNotice)
router.route('/notice/delete/:id')
    .delete(parser,deleteNotice)

module.exports = router