const Router = require('koa-router')
// const { flow } = require('lodash')
const { Flow } = require('../../model/flow')
const Art = require('../../model/Art')
const { Favor } = require('../../model/favor')
const { LikePathValidator } = require('../../validators/validator')
const router = new Router({
    prefix: '/classic',
})


const { Auth } = require('../../../middlewares/auth')
const favor = require('../../model/favor')
const { LoginType } = require('../../lib/enum')

//获取最新一期期刊
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [['index', 'DESC']]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    art.setDataValue('flow', flow)
    throw new global.errs.Success(art, '获取成功', 200)
})


// 获取期刊的点赞信息
router.get('/favor/:type/:art_id', new Auth().m, async (ctx, next) => {
    const v = await new LikePathValidator().validate(ctx)
    const art = await Art.getData(ctx.params.art_id * 1, ctx.params.type * 1)
    const favors = await Favor.findOne({
        where: {
            art_id: ctx.params.art_id,
            type: ctx.params.type,
            uid: ctx.Auth.uid
        }
    })
    let ReturnData = {
        fav_nums: art.fav_nums,
        islike: favors ? true : false
    }

    throw new global.errs.DataReturn(ReturnData, '获取成功', 201)
})

/// 获取某一期刊的详细信息
router.get('/:type/:art_id', new Auth().m, async (ctx, next) => {
    const v = await new LikePathValidator().validate(ctx)
    const art = await Art.getData(ctx.params.art_id * 1, ctx.params.type * 1)
    const favors = await Favor.findOne({
        where: {
            art_id: ctx.params.art_id * 1,
            type: ctx.params.type * 1,
            uid: ctx.Auth.uid
        }
    })
    favors.setDataValue("art", art)
    throw new global.errs.DataReturn(favors, '获取成功', 201)
})




// 获取用户喜欢期刊
router.get('/favor', new Auth().m, async (ctx, next) => {
    let newData = await Favor.getMyLikeFavor(ctx.Auth.uid)
    throw new global.errs.DataReturn(newData, '获取成功', 201)
})

module.exports = router