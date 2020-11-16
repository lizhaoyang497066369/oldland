const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const { LikeValidator } = require('../../validators/validator')
const { Favor } = require('../../model/favor')
const router = new Router({
    prefix: '/like'
})

router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx);
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.Auth.uid)
    throw new global.errs.Success('点赞成功', 201)
})
router.post('/unlike', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx)
    await Favor.unlike(v.get('body.art_id'), v.get('body.type'), ctx.Auth.uid)
    throw new global.errs.Success('取消点赞成功', 201)
})




module.exports = router

