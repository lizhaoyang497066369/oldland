module.exports = {
    // dev 为开发环境  prod 为 生产坏境
    environment: 'dev',
    database: {
        dbName: 'OldIsland',  // 数据库名称
        host: '127.0.0.1',   // 数据库地址
        port: 3306,     // MySQL开启端口
        user: 'root',     // 数据库 用户名
        password: "123456"   // 数据库用户密码
    },
    security: {
        secretKey: "lizhaoyang",
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        appId: 'wx5b44ba0827278f3a',
        appSecret: '099b8dfb008302565911da5a15cbaf79',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}