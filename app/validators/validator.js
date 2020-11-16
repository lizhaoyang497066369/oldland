const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../model/user')
const { LoginType } = require('../lib/enum');
const Art = require('../model/Art')
const { Book } = require('../model/book')
class IntValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '传入的值不是正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', 'Email 不符合规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码至是6-32个字符', {
                min: 6,
                max: 32
            })
        ]
        this.password2 = this.password1,
            this.nickname = [
                new Rule('isLength', '名称不符合规范3-32', {
                    min: 3,
                    max: 32
                })
            ]
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1;
        const psw2 = vals.body.password2;
        if (psw1 != psw2) {
            throw new Error('两个密码必须相同')
        }
    }
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email  // 前一个是字段， 后一个是值
            }
        })
        if (user) {
            throw new Error('Eamil 已经存在')
        }
        const openid = vals.body.openid
        const open = await User.findOne({
            where: {
                openid: openid
            }
        })
        if (open) {
            throw new Error('openid 已经存在')
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', 'account 不符合账号规范', {
                min: 4,
                max: 32,
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', 'secret 至少6-128个字符', {
                min: 6,
                max: 128
            })
        ]
    }
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}


class LikeValidator extends LinValidator {
    constructor() {
        super()
        this.art_id = [
            new Rule('isLength', 'art_id 不合法', { min: 1 })
        ]
        this.type = [
            new Rule('isLength', 'type 不合法', { min: 1 })
        ]
    }
    async validateType(vals) {
        if (vals) {
            const art = await Art.getData(vals.body.art_id * 1, vals.body.type * 1)
            if (!art) {
                throw new Error('没有该作品')
            }
        } else {
            throw new Error('art_id 和 type是必穿字段')
        }
    }
}

class LikePathValidator extends LinValidator {
    constructor() {
        super()
        this.art_id = [
            new Rule('isLength', 'art_id 不合法', { min: 1 })
        ]
        this.type = [
            new Rule('isLength', 'type 不合法', { min: 1 })
        ]
    }
    async validateType(vals) {
        if (vals) {
            const art = await Art.getData(vals.path.art_id * 1, vals.path.type * 1)
            if (!art) {
                throw new Error('没有该作品')
            }
        } else {
            throw new Error('art_id 和 type是必穿字段')
        }
    }
}

class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', '搜索的关机词不能为空')
        ]
        this.start = [
            new Rule('isInt', 'start 不符合规范', {
                min: 0,
                max: 200
            }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', 'start 不符合规范', {
                min: 1,
                max: 20,
            }),
            new Rule('isOptional', '', 10)
        ]
    }
}

class addCommentValitor extends LinValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '内容不合法', { min: 1 })
        ]
    }
    async validateBookId(vals) {
        const bookID = vals.body.bookId
        const id = await Book.findAll({
            where: {
                id: bookID
            }
        })

        if (!(id.length)) {
            throw new global.errs.NotFound('id不合法', 401)
        }
    }
}
class bookIdValidator extends LinValidator {
    constructor() {
        super()
    }
    async validateId(vals) {
        const id = await Book.findAll({
            where: {
                id: vals.path.bookId
            }
        })
        if (!(id.length)) {
            throw new global.errs.NotFound('id不合法', 401)
        }
    }
}


module.exports = {
    IntValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    LikePathValidator,
    SearchValidator,
    addCommentValitor,
    bookIdValidator
}