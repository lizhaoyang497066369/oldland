const Sequelize = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', // 数据库类型
    host,              // 数据库地址
    port,             // 数据库端口
    logging: false,   // 是否打印数据库信息
    timezone: '+08:00',  // 中国时间与国际时间相差8小时 所以+8小时，
    define: {
        timestamps: true,
        // paranoid: false,
        createdAt: true,
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
    }
})
sequelize.sync(
    {
        force: false // 重启时是否清空数据库
    }
)
module.exports = {
    sequelize,
}