const express = require('express')
const router = express.Router()
const moment = require('moment')
const { resFomater } = require('../../common/resStruct')
const musicModel=require('../../db/model/musicSchema')

router.get('/getMusic', async(req, res) => {
   const result=await musicModel.find().sort({createdAt:-1})
   res.send(resFomater(result))
})

router.post('/addMusic', async (req, res) => {
  const { url,name } = req.body//to do
  if (url == '') {
    res.send(resFomater('音乐地址不能空嗷'))
  } 
    await musicModel.create({
     url,
     name
    })

    res.send(resFomater('创建成功'))
})

router.post('/deleteMusic', async (req, res) => {
  const { id } = req.body
  await musicModel.findByIdAndDelete(id)   
  res.send(resFomater('删除成功'))
})
module.exports = router