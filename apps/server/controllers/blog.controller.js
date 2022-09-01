const Blog = require("../models/blog.model")
const Log = require("../models/activity_log.model")

const addBlog = (req,res,next) => {
    let data = req.body;
    try{
        let add_blog = new Blog(data)
        add_blog.save()
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} added a blog with blog id ${add_blog.id}`,action:"create",ip:req.ip}
        let log=new Log(log_data)
        log.save()
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
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} updated a blog with blog id ${update_blog.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()
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
        console.log(req.ip)
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
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} deleted a blog with blog id ${blog.id}`,action:"delete",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            msg:"blog deleted successfully",
            result:blog
        })
    } catch(error){
        next({msg:"Error deleting blog"})
    }
}

module.exports = {addBlog,updateBlog,fetchBlog,listAllBlogs,deleteBlog}