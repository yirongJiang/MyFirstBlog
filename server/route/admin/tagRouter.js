const express = require('express')
const router = express.Router()
const moment = require('moment')
const { resFomater } = require('../../common/resStruct')
const tagModel = require('../../db/model/tagSchema')

router.post('/add', async (req, res) => {
  const { name } = req.body
  if (!name) {
    res.send(resFomater('名字不能为空嗷'))
    return
  }
    await tagModel.create({
    name
  })

  res.send(resFomater('创建成功'))
})


router.post('/delete', async (req, res) => {
  const { id } = req.body
  await tagModel.findByIdAndDelete(id)
  res.send(resFomater('删除成功'))
})

router.post('/update', async (req, res) => {
  const { name } = req.body
  await tagModel.findByIdAndUpdate(id, {
    name
  })
  res.send(resFomater('修改成功'))
})

router.get('/find', async (req, res) => {
  const total = await tagModel.count()
  const result = await tagModel.find().sort({ createTime: -1 })

  res.send(resFomater({ result, total }))
})



module.exports = router