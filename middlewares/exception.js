
const { HttpException } = require('../core/http-exception')
const catError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {

        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        if (isDev && !isHttpException) {
            throw error
        }
        if (isHttpException) {
            ctx.body = {
                ...error,
                require: `${ctx.method} ${ctx.path}`,
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: '服务器程序错误，请联系相关人员',
                error_code: 999,
                require: `${ctx.method} ${ctx.path}`,

            }
        }
    }
}
module.exports = catError