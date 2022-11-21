const express = require('express')
const router = express.Router()
const moment = require('moment')
const { resFomater } = require('../../common/resStruct')
const blogModel = require('../../db/model/blogSchema')

router.get('/test', (req, res) => {
  res.send('hello world11111')
})

router.post('/add', async (req, res) => {
  const { content, author, title = "我的博客标题", tags } = req.body//to do
  if (content == '') {
    res.send(resFomater('文章内容不能为空嗷'))

  } else {

    await blogModel.create({
      content,
      author,
      title,
      tags
    })

    res.send(resFomater('创建成功'))
  }
})


router.post('/delete', async (req, res) => {
  const { id } = req.body
  await blogModel.findByIdAndDelete(id)   
  res.send(resFomater('删除成功'))
})

router.post('/update', async (req, res) => {
  const { id, content, tag, author, createTime = moment(+new Date()).format('YYYY-MM-DD ') } = req.body
  await blogModel.findByIdAndUpdate(id, {
    content,
    author,
    createTime,
    tag
  })
  res.send(resFomater('修改成功'))
})

router.get('/find', async (req, res) => {
  const { page = 1, limit = 8 } = req.query
  const total = await blogModel.count()
  const result = await blogModel.find().skip((page - 1) * limit).limit(limit).sort({ createTime: -1 })
  res.send(resFomater({ result, total }))
})



router.get('/detail', async (req, res) => {
  const { id } = req.query
  const result = await blogModel.findById(id)
  res.send(resFomater({ result }))
})   


module.exports = router