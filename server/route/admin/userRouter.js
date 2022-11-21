const express = require('express')
const router = express.Router()
const { resFomater } = require('../../common/resStruct')
const userModel = require('../../db/model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtPassword } = require('../../config/index')

router.get('/test', (req, res) => {
    res.send('hello world11111')
})

router.post('/add', async (req, res) => {
    try {
        const { username, password } = req.body

        // 判断是否用户已经存在的逻辑，需要在这里加
        // 1. 添加一个新用户之前，先根据用户名查数据库
        // 2。 数据库里有这个用户名的，就直接给前端报错
        // 3.如果没有，就添加到数据库里

        // 写完代码习惯性格式化下。 后续有一个代码格式化规范的工具叫 prettier ，后面可以学习一下
        // alt + shift + f

        const user = await userModel.find({ username })
        console.log(user)
        // 这个判断有问题， user 是个空数组，可以这样改
        if (user?.length > 0) {
            res.send(resFomater('重名儿了'))
            return
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await userModel.create({
            username,
            password: hashPassword
        })

        res.send(resFomater('创建成功'))
    } catch (err) {
        res.send(resFomater(err))
    }
})


router.post('/delete', async (req, res) => {
    const { id } = req.body
    await userModel.findByIdAndDelete(id)
    res.send(resFomater('删除成功'))

})
router.get('/find', async (req, res) => {
    const { page = 1, limit = 8 } = req.query
    const total = await userModel.count()
    const result = await userModel.find().skip((page - 1) * limit).limit(limit)
    res.send(resFomater({ total, result }))
})

router.post('/update', (req, res) => {

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.send(resFomater('账号或密码不能为空'))
        return
    }
    const user = await userModel.find({ username })
    if (!user) {
        res.send(resFomater('该用户不存在'))
        return
    }

    // if (user == username) {
    //     res.send(resFomater('重名啦'))
    //     return
    // }//

    // 密码没对
    console.log(user)
    const token = jwt.sign({ username }, jwtPassword, { expiresIn: '10h' })
    // 这 password undefined了，找不到这个对应的用户。所以得做一下undefiend判空,就这儿加问号，这里需要加可选连判断
    // 数组的可选链就是  users?.[0]
    const isLogin = bcrypt.compareSync(password, user?.[0]?.password)
    // const message = bcrypt.compareSync(password, user?.[0]?.password) ? '登陆成功' : '账号或密码错误'

    // 这里逻辑需要改造一下

    if (!isLogin) {
        res.send(resFomater('账号或密码错误'))
        return
    }

    res.send(resFomater({
        message: '登陆成功',
        token
    }))
})

module.exports = router