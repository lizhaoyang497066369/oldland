const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Favor } = require('./favor')


class HotBook extends Model {
    static async getAllBook() {
        const books = await HotBook.findAll({
            order: [['index', 'DESC']]
        })
        return books
    }

    static async getAll() {
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        })
        const ids = []
        books.forEach((book) => {
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where: {
                'art_id': {
                    [Op.in]: ids,
                    type: 400
                }
            },
            group: ['art_id'],
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        let newBooks = []
        books.forEach(book => {
            newBooks.push(HotBook._getEachBook(book, favors))
        })
        return newBooks
    }
    static _getEachBook(book, favors) {
        let count = 0
        favors.forEach((favor) => {
            if (book.id == favor.art_id) {
                count = favor.count
            }
        })
        let newBook = {
            ...book.dataValues,
            'count': count
        }
        return newBook
    }
}


HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: "hotBook",
    timestamps: true,
    createdAt: true
})

module.exports = { HotBook }