
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')
const classicFieds = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.STRING,
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    title: Sequelize.STRING,
    type: Sequelize.STRING,
}
class Movie extends Model {

}

Movie.init(classicFieds, { sequelize, tableName: 'movie', timestamps: true, createdAt: true })

class Sentence extends Model {

}
Sentence.init(classicFieds, { sequelize, tableName: "sentence", timestamps: true, createdAt: true })

class Music extends Model {

}

const musicFields = Object.assign({
    url: Sequelize.STRING
}, classicFieds)


Music.init({
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.STRING,
    url: Sequelize.STRING,
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    title: Sequelize.STRING,
    type: Sequelize.STRING,
}, {
    sequelize,
    tableName: "music",
    timestamps: true,
})


module.exports = {
    Music,
    Movie,
    Sentence,
}