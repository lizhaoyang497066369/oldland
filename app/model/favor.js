const { sequelize } = require("../../core/db")
const { Sequelize, Model, where, Op } = require('sequelize')
const Art = require('./Art')
class Favor extends Model {
    // 业务逻辑
    static async like(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (favor) {
            throw new global.errs.unLikeValidator('你已经点过赞了')
        }

        try {
            await sequelize.transaction(async (t) => {
                await Favor.create({
                    art_id,
                    type,
                    uid
                }, { transaction: t })
                const art = await Art.getData(art_id * 1, type * 1)
                await art.increment('fav_nums', { by: 1, transaction: t })
            })
        } catch (error) {
            throw new global.errs.unLikeValidator('点赞失败，请稍后重试')
        }
    }

    static async unlike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.unLikeValidator('你已经取消过点赞了')
        }

        try {
            await sequelize.transaction(async (t) => {
                await favor.destroy({
                    force: true,
                    transaction: t
                })

                const art = await Art.getData(art_id * 1, type * 1)
                await art.decrement('fav_nums', { by: 1, transaction: t })
            })
        } catch (error) {
            throw new global.errs.unLikeValidator('点赞失败，请稍后重试')
        }
    }

    static async getMyLikeFavor(uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400,
                }
            }
        })
        if (!arts) {
            throw new global.errs.Success('该用户没有喜欢的期刊')
        }
        return await Art.getList(arts)
    }

}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize, tableName: 'favor', timestamps: true, createdAt: true
})



module.exports = { Favor }