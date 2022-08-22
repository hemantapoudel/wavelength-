const Blog = require("../models/blog.model")

const addBlog = (req,res,next) => {
    let data = req.body;
    try{
        let add_blog = new Blog(data)
        add_blog.save()
        res.json({
            msg:"Blog added successfully",
            result:add_blog
        })

    } catch(error){
        next({msg:"Error adding blogs"})
    }
}

const updateBlog = async (req,res,next) => {
    let data = req.body
    try{
        let update_blog = await Blog.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        res.json({
            msg:"Successfully updated blog"
        })

    } catch(error){
        next({msg:"Error updating blog"})
    }
}

const listAllBlogs = async (req,res,next) => {
    try{
        let blogs = await Blog.find({})
        res.json({
            msg:"ALl Blogs fetched successfully",
            result:blogs
        })

    } catch(error){
        next({msg:"Error fetching blogs"})
    }
}

const fetchBlog = async (req,res,next) => {
    let data = req.body
    try{
        let blog = await Blog.findById(req.params.id)
        res.json({
            msg:"Blog fetched successfully",
            result:blog
        })

    } catch(error){
        next({msg:"Error fetching blog"})
    }
}

const deleteBlog = async (req,res,next) => {
    try{
        let blog = await Blog.findByIdAndDelete(req.params.id)
        res.json({
            msg:"blog deleted successfully",
            result:blog
        })
    } catch(error){
        next({msg:"Error deleting blog"})
    }
}

module.exports = {addBlog,updateBlog,fetchBlog,listAllBlogs,deleteBlog}