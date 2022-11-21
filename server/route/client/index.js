const blogRouter = require('./blogRouter')
const commentRouter=require('./commentRouter')
const tagRouter=require('./tagRouter')
const musicRouter=require('./musicRouter')
const imagesRouter=require('./imagesRouter')
const introductionRouter=require('./introductionRouter')
const clientRoutes = app => {
  app.use('/client/blog', blogRouter)
  app.use('/client/comment',commentRouter)
  app.use('/client/tag',tagRouter)
  app.use(`/client/music`,musicRouter)
  app.use(`/client/introduction`,introductionRouter),
  app.use(`/client/images`,imagesRouter)
}
module.exports = clientRoutes