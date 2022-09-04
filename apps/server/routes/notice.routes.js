const router = require("express").Router()
const body_parser = require("body-parser")
const { addNotice, updateNotice, listAllNotices, fetchNotice, deleteNotice } = require("../controllers/notice.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()

router.route("/notice/add")
    .post(isLoggedIn,parser,addNotice)
router.route('/notice/update/:id')
    .put(isLoggedIn,parser,updateNotice)
router.route('/notice/listall')
    .get(isLoggedIn,parser,listAllNotices)
router.route('/notice/fetch/:id')
    .get(isLoggedIn,parser,fetchNotice)
router.route('/notice/delete/:id')
    .delete(isLoggedIn,parser,deleteNotice)

module.exports = router