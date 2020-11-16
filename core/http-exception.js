class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 1000, code = 400) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '传参错误'
        this.errorCode = errorCode || 401
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}
class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.msg = msg || '未找到资源'
        this.errorCode = errorCode || 1000
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 1001
    }
}

class DataReturn extends HttpException {
    constructor(data, msg, code) {
        super()
        this.data = data || null
        this.msg = msg || '数据获取成功'
        this.code = code || 201
    }
}

class Forbbiden extends HttpException {
    constructor(msg) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = 403
    }
}

class unLikeValidator extends HttpException {
    constructor(msg, errCode) {
        super()
        this.code = 400
        this.msg = msg || '点赞失败'
        this.errorCode = errCode || 403
    }
}


module.exports = {
    HttpException, // 基础函数
    ParameterException,  // 传参错误函数
    Success, // 成功函数
    NotFound, //用户为注册 404 函数
    AuthFailed,  //密码不正确 
    DataReturn, // 获取成功哈数
    Forbbiden,  //禁止访问函数
    unLikeValidator, // 点赞业务的异常
}