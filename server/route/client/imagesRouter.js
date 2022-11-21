const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const imagesModal=require('../../db/model/imgesSchema')


router.get('/getAllImages',async(req,res) => { 
  const result=await imagesModal.find()
  res.send(resFomater(result))
 })  

 module.exports = router  