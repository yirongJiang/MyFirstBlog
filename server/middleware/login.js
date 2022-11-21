const { resFomater } = require("../common/resStruct")
const { jwtPassword } = require('../config/index')

const jwt = require('jsonwebtoken')

const whiteLists = ['/admin/user/login']
function login(req, res, next) {
    // if(req.headers.authorization==='client'){
    //     whiteLists=['/blog/findAll','/blog/detail']
    // }
    if (whiteLists.includes(req.url)) {
        next()
        return
    }

    const isAuth = req.headers?.authorization ? true : false
    if (!isAuth) {
        res.send(resFomater('请求头中未携带token'))
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, jwtPassword, (err, decode) => {
        if (err) {
            res.send(resFomater('token过期或无效', false, 401))
            return
        }

        req.username = decode.usernmae
        next()
    })
}
module.exports = login