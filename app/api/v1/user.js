const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../model/user')
const router = new Router({
    prefix: '/user'
})

// post 增加数据
// put 修改数据
//get 查询数据
//detele 删除数据

router.post('/register', async (ctx, next) => {
    //接受参数 linvalidator
    //email password password2 nickname
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password1'),
        nickname: v.get('body.nickname'),
        openid: v.get("body.openid")
    }
    const r = await User.create(user)
    const srccess = await new global.errs.Success('注册成功', 0)
    throw srccess

    // {
    //     "nickname":"李昭洋",
    //     "password1":"497066369",
    //     "password2":"497066369",
    //     "email":"140@qq.com",
    //     "openid":"1f4s0318"
    // }
})

module.exports = router