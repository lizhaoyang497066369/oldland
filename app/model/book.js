const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

class Book extends Model {
    constructor(id) {
        super()
        this.id = id
    }
    async detail() {
        const bookDatail = await Book.findOne(
            {
                where: {
                    id: this.id
                }
            }
        )
        return bookDatail
    }
    static async SearchData(q, start, count) {
        const book = await Book.sequelize.query(`select * from book where author LIKE("%${q}%") or binding Like("%${q}%") or category Like("%${q}%") or pubtitle Like("%${q}%") or summart Like("%${q}%") or title Like("%${q}%")`)
        return book[0]
    }
}
Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    author: Sequelize.STRING,
    binding: Sequelize.STRING,
    category: Sequelize.STRING,
    image: Sequelize.STRING,
    isbn: Sequelize.INTEGER,
    pages: Sequelize.INTEGER,
    price: Sequelize.STRING,
    pubtitle: Sequelize.STRING,
    summart: Sequelize.STRING,
    title: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'book'
})

module.exports = { Book }