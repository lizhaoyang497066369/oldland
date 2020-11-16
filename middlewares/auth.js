const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8   // 普通用户
        Auth.ADMIN = 16 // 管理员用户
        Auth.ADMIN_SUPER = 32 // 超级管理员
    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbbiden('没有访问权限')
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                throw new global.errs.Forbbiden('token不正确')
            }
            if (decode.scope < this.level) {
                throw new global.errs.Forbbiden('角色权限不足')
            }
            ctx.Auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
    static varifyToken(token) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}
module.exports = { Auth }