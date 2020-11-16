const Router = require('koa-router')
const router = new Router({
    prefix: '/book'
})
const { Book } = require('../../model/book')
const { Auth } = require("../../../middlewares/auth")
const { HotBook } = require('../../model/hot-book')

const { IntValidator, SearchValidator } = require('../../validators/validator')
// router.post('/book/:id', async (ctx, next) => {
//     const path = ctx.params
//     const query = ctx.request.query
//     const headers = ctx.request.header
//     const body = ctx.request.body
//     const v = new IntValidator().validate(ctx)
//     ctx.body = {
//         path,
//         query,
//         headers,
//         body,
//     }

//     if (true) {
//         const error = await new global.errs.HttpException('程序内部错误', 1001, 400)
//         throw error
//     }
// })

// 获取我喜欢的书籍
router.get('/like_book', new Auth().m, async (ctx, next) => {
    const favors = await HotBook.getAll()
    throw new global.errs.DataReturn(favors, '获取成功')
})

// 获取热门书籍
router.get('/hot_book', async (ctx, next) => {
    const books = await HotBook.getAllBook()
    throw new global.errs.DataReturn(books, '获取成功')
})


// 获取某一图书的详细信息
router.get('/detail/:id', async (ctx, next) => {
    const v = new IntValidator().validate(ctx)
    const book = await new Book(ctx.params.id).detail()
    throw new global.errs.DataReturn(book, '获取成功')
})

// 图书搜索
router.get('/search', async (ctx, next) => {
    const v = await new SearchValidator().validate(ctx)
    const book = await Book.SearchData(ctx.query.q)
    // console.log(book);
    // console.log(v.get('query.start') * 1, v.get('query.count') * 1);
    // book = book.splice(v.get('query.start') * 1, v.get('query.count') * 1)
    console.log(book);



    throw new global.errs.DataReturn(book, '获取成功')
})
module.exports = router