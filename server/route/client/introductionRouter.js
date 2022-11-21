const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const introductionModal=require('../../db/model/introductionSchema')


router.get('/getIntroduction',async(req,res) => { 
  const result=await introductionModal.find()
  res.send(resFomater(result))
 })  

 module.exports = router  