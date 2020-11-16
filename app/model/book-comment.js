const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const book = require('./book')


class Comment extends Model {

    static async addComment(bookId, content, uid) {
        const comment = await Comment.findOne({
            where: {
                bookId: bookId,
                content,
            }
        })
        if (!comment) {
            return await Comment.create({
                bookId: bookId,
                content,
                nums: 1,
                uid,
            })
        } else {
            return await comment.increment('nums', { by: 1 })
        }
    }
    static async getData(bookID) {
        const comment = await Comment.findAll({
            where: {
                bookId: bookID,
            }
        })
        return comment
    }
}

Comment.init(
    {
        content: Sequelize.STRING(128),
        bookId: Sequelize.STRING,
        nums: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        uid: Sequelize.STRING,
    },
    {
        sequelize,
        tableName: 'comment',
        timestamps: true,
        createdAt: true,
    }
)


module.exports = {
    Comment
}