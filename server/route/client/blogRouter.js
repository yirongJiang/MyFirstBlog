const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const blogModel = require('../../db/model/blogSchema')


router.get('/findAll', async (req, res) => {
  const { page = 1, limit = 7 } = req.query
  const total = await blogModel.count()
  const result = await blogModel.find().skip((page - 1) * limit).limit(limit).sort({ createTime: -1 })
  res.send(resFomater({ result, total }))
})

router.get('/detail', async (req, res) => {
  const { id } = req.query
  await blogModel.findByIdAndUpdate(id, { $inc: { visit: 1 } })
  const result = await blogModel.findById(id)
  res.send(resFomater({ result }))
})

// router.post('/postComment', async (req, res) => {
//   const { comments, id } = req.body
//   const oldComments = await blogModel.findById(id, { comments })
//   const newComments = oldComments.comments.push(comments)
//   await blogModel.findByIdAndUpdate(id, { comments: newComments })
//   res.send(resFomater("评论成功"))
// })


router.post('/postLike', async (req, res) => {
  const { id } = req.body
  const result = await blogModel.findByIdAndUpdate(id, { $inc: { like: 1 } })
  res.send(resFomater(result))
})

router.get('/getLike', async (req, res) => {
  
  const { id } = req.query
  const result = await blogModel.findById(id)
  res.send(resFomater(result))
})

router.get('/getAllTags', async (req, res) => {
  const result = await blogModel.find({ tags })
  res.send(resFomater(result))
})
//TO DO

router.get('/getBlogWithTag',async(req,res) => { 
  const {tagName,limit=7,page=1}=req.query;
  const total=await blogModel.find({'tags':tagName}).count()
  const result=await blogModel.find({'tags':tagName}).skip((page-1)*limit).limit(limit)
  res.send(resFomater({result,total}))
 })

 router.get('/getNewestBlog',async(req,res) => { 
   const result=await blogModel.find().limit(5).sort({createTime:-1})
   res.send(resFomater(result))
  })
module.exports = router