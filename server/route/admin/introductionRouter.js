const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const introductionModel = require('../../db/model/introductionSchema')

router.post('/addIntroduction', async (req, res) => {
  const { parentId,type, content = '' } = req.body
  console.log(parentId)
  try {
    if (type === '吃吃喝喝') {
      await introductionModel.findByIdAndUpdate(parentId, {
        $push: {
          aboutEating: {
            content
          }
        }
      })
    }
    if (type === '技术栈') {
      await introductionModel.findByIdAndUpdate(parentId, {
        $push: {
          aboutSkills: {
            content
          }
        }
      })
    }

    if (type === '爱好') {
    await introductionModel.findByIdAndUpdate(parentId, {
        $push: {
          aboutSomethingILike: {
            content
          }
        }
      })
    }

    res.send(resFomater('添加成功'))
  } catch (error) {
    res.send(resFomater(error))
  }
})

router.get('/getIntroduction', async (req, res) => {
  const result = await introductionModel.find()
  res.send(resFomater(result))
})

router.post('/deleteIntroduction', async (req, res) => {
  const { parentId,id,type} = req.body
  console.log('id')
  console.log(id)
  console.log('type')
  console.log(type)
  try {
    if (type === '吃吃喝喝') {
      await introductionModel.findByIdAndUpdate(parentId, {
        $pull: {
          aboutEating: {
            _id: id
          }
        }
      })
    }
    if (type === '技术栈') {
      await introductionModel.findByIdAndUpdate(parentId, {
        $pull: {
          aboutSkills: {
            _id: id
          }
        }
      })
    }

    if (type === '爱好' || undefined) {
      await introductionModel.findByIdAndUpdate(parentId, {
        $pull: {
          aboutSomethingILike: {
            _id: id
          }
        }
      })
    }

    res.send(resFomater('添加成功'))
  } catch (error) {
    res.send(resFomater(error))
  }
})
module.exports = router
