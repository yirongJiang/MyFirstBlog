const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const musicModel = require('../../db/model/musicSchema')


router.get('/getAllMusic',async(req,res) => { 
  const result=await musicModel.find().sort({createdAt:-1})
  res.send(resFomater(result))
 })  

 module.exports = router  