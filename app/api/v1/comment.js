const Router = require('koa-router')
const router = new Router({
    prefix: '/comment'
})
const { Book } = require('../../model/book')
const { Comment } = require('../../model/book-comment')
const { Auth } = require("../../../middlewares/auth")

const { addCommentValitor, bookIdValidator } = require('../../validators/validator')
router.post('/add', new Auth().m, async (ctx, next) => {
    const v = await new addCommentValitor().validate(ctx)
    const iscomment = await Comment.addComment(ctx.request.body.bookId, ctx.request.body.content, ctx.Auth.uid)
    if (iscomment) {
        throw new global.errs.Success('评论成功')
    } else {
        throw new global.errs.NotFound('点赞失败', 400)
    }
})



router.get('/:bookId', new Auth().m, async (ctx, next) => {
    const v = await new bookIdValidator().validate(ctx)
    const commit = await Comment.getData(v.get('path.bookId'))
    if (commit) {
        throw new global.errs.DataReturn(commit, '获取成功')
    } else {
        throw new global.errs.NotFound('获取失败', 400)
    }
    ctx.body = {
        a: '12'
    }
})

module.exports = router 