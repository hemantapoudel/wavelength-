const router = require("express").Router()
const body_parser = require("body-parser")
const { addBlog, updateBlog, listAllBlogs, fetchBlog, deleteBlog } = require("../controllers/blog.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()

router.route("/blog/add")
    .post(isLoggedIn,parser,addBlog)
router.route('/blog/update/:id')
    .put(isLoggedIn,parser,updateBlog)
router.route('/blog/listall')
    .get(parser,listAllBlogs)
router.route('/blog/fetch/:id')
    .get(parser,fetchBlog)
router.route('/blog/delete/:id')
    .delete(isLoggedIn,parser,deleteBlog)

module.exports = router