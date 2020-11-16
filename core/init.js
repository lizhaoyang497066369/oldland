const Router = require('koa-router')
const requireDirectory = require('require-directory')
class InitManger {
    static InitCore(app) {
        InitManger.app = app
        InitManger.initLoadRouter()
        InitManger.loadHttpException()
        InitManger.loadConfig()
    }
    static initLoadRouter() {
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: (obj) => {
                if (obj instanceof Router) {
                    InitManger.app.use(obj.routes())
                }
            }
        })
    }

    static loadConfig() {
        const configPath = process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
    static loadHttpException() {
        const error = require('./http-exception')
        // global.errors = error
        global.errs = error
    }
}
module.exports = InitManger