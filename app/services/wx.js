const util = require('util')  // 格式化模块
const axios = require('axios')
const { User } = require('../model/user')
const { generateToken } = require('../../core/util')


class WXManger {
    static async codeToken(code, scope) {
        const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code)
        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid 获取失败')
        }
        const errCode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errCode) {
            throw new global.errs.AuthFailed(`openid 获取失败 ${errmsg}`)
        }
        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, scope)
    }
}
module.exports = { WXManger }