const blogRouter = require('./blogRouter')
const userRouter = require('./userRouter')
const tagRouter=require('./tagRouter')
const musicRouter=require('./musicRouter')
const introductionRouter=require('./introductionRouter')
const imageRouter=require('../admin/imgeRouter')
const login = require('../../middleware/login')

const prefix = '/admin'

const adminRoutes = app => {
  app.use(login)
  app.use(`${prefix}/user`, userRouter)
  app.use(`${prefix}/blog`, blogRouter)
  app.use(`${prefix}/tag`,tagRouter)
  app.use(`${prefix}/music`,musicRouter)
  app.use(`${prefix}/introduction`,introductionRouter)
  app.use(`${prefix}/images`,imageRouter)
}

module.exports = adminRoutes