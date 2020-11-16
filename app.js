const Koa = require('koa')
const params = require('koa-bodyparser') // 挂载body'中的中间件
const InitManger = require('./core/init') // 引入每一条路由
const catError = require('./middlewares/exception')
const app = new Koa()

require('./app/model/classic')
app.use(params())
app.use(catError)
InitManger.InitCore(app)
app.listen(500)