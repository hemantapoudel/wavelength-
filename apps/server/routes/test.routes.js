const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()
const { addTest, updateTest, listTests, showTest, deleteTest } = require("../controllers/test.controller")
const uploader = require('../middlewares/uploader.middleware')
router.route('/test/add')
    .post(parser,uploader.single('image'),addTest)
router.route('/test/update/:id')
    .put(parser,updateTest)
router.route('/test/listall')
    .get(listTests)
router.route('/test/fetch/:id')
    .get(showTest)
router.route('/test/delete/:id')
    .delete(deleteTest)

module.exports = router