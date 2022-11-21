const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const commentModal = require('../../db/model/commentSchema')

router.get('/getComments', async (req, res) => {
  const result = await commentModal.find().sort({createdAt:-1})
  res.send(resFomater(result))
})

router.post('/postComment', async (req, res) => {
  try {
    // 当前文章的id blogId, username,  commentContent , type - 区分一级还是二级
    // 一级评论前端传过来的数据结构
    // const frontendData = {
    //   blogId: "adsioja1232141",
    //   type: 1,
    //   username: '王大锤',
    //   commentContent: '讲的很好，下次不要再讲了'
    // }
    const { body } = req
    const { type } = body

    if (type === 1) {
      const { blogId = '', username = '', commentContent = '' } = body
      // 一级评论表插数据
      await commentModal.create({
        blogId,
        username,
        commentContent
      })
      res.send(resFomater('评论成功'))
    }

    // 二级评论前端传过来的数据结构
    // const data = {
    //   parentCommentId: '123123sadasda',
    //   type: 2,
    //   username: '王大锤',
    //   commentContent: '讲的很好，下次不要再讲了'
    // }
    if (type === 2) {
      const { parentCommentId = '', username = '', commentContent = '', to = '' } = body
      // 一级评论的 reply 数组去插数据
      await commentModal.findByIdAndUpdate(parentCommentId, {
        $push: {
          replys: {
            to,
            username,
            commentContent
          }
        }
      })

      res.send(resFomater('评论成功'))
    }


  } catch (e) {
    res.send(resFomater(`评论失败，${e}`))
  }
})

module.exports = router