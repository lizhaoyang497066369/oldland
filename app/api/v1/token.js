const Router = require('koa-router')
const { LoginType } = require('../../lib/enum')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { User } = require('../../model/user')
const { generateToken } = require('../../../core/util')
const { WXManger } = require('../../services/wx')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/token'
})

router.post('/', async (ctx, next) => {
    let token;
    var scope = 8;
    const v = await new TokenValidator().validate(ctx);
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            throw new global.errs.DataReturn(token, 'token获取成功', 201)
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManger.codeToken(v.get('body.account'), scope)
            throw new global.errs.DataReturn(token, 'token获取成功', 201)
            break;
        case LoginType.ADMIN_EMAIL:
            scope = 16
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            throw new global.errs.DataReturn(token, 'token获取成功', 201)
        default:
            throw new global.errs.ParameterException('没有处理该登录方式的函数')
            break;
    }
    async function emailLogin(account, secret) {
        let user = await User.varifyEmailPassword(account, secret)
        return token = generateToken(user.id, scope)
    }
})


router.post('/varify', async (ctx, next) => {
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.varifyToken(v.get('body.token'))
    if (result) {
        throw new global.errs.Success('token 校验成功', 200)
    } else {
        throw new global.errs.AuthFailed('token 校验失败',)
    }
})


module.exports = router