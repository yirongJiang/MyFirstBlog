const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const tagModel = require('../../db/model/tagSchema')


router.get('/getAllTags',async(req,res) => { 
  const result=await tagModel.find()
  res.send(resFomater(result))
 })  

 module.exports = router  