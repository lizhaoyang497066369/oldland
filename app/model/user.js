const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
class User extends Model {
    static async varifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new global.errs.NotFound('用户未注册')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid(openid) {
        const user = User.findOne({
            where: {
                openid,
            }
        })
        return user
    }
    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }

}
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // 主键id
        autoIncrement: true,
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)  // 生成盐  10代表成本和安全程度
            const pas = bcrypt.hashSync(val, salt)
            this.setDataValue('password', pas)
        },
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true, // 唯一
    }
}, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    createdAt: true
})

module.exports = { User }