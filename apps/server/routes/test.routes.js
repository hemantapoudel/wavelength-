const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()
const { addTest, updateTest, listTests, showTest, deleteTest } = require("../controllers/test.controller")

router.route('/test/add')
    .post(parser,addTest)
router.route('/test/update/:id')
    .put(parser,updateTest)
router.route('/test/listall')
    .get(listTests)
router.route('/test/fetch/:id')
    .get(showTest)
router.route('/test/delete/:id')
    .delete(deleteTest)

module.exports = router