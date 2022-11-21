const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const imagesModel = require('../../db/model/imgesSchema')

router.post('/postImages', async (req, res) => {
  const { imageUrl, imageName } = req.body
  const result = await imagesModel.create({
    imageUrl,
    imageName
  })
  res.send(resFomater(result))
})

router.get('/getImages', async (req, res) => {
  const result = await imagesModel.find()
  res.send(resFomater(result))
})

router.post('/deleteImages', async (req, res) => {
  const { id } = req.body
  await imagesModel.findByIdAndDelete(id)
  res.send(resFomater('删除成功'))
})

module.exports = router