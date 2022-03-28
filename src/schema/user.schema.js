const Sequelize = require('sequelize')
const database = require('../config/db')

const User = database.define('usario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    nome: {
        type: Sequelize.STRING,


    },
    endereco: {
        type: Sequelize.STRING,


    },
    cidade: {
        type: Sequelize.STRING,


    },
    telefone: {
        type: Sequelize.STRING,


    },
    email: {
        type: Sequelize.STRING,


    },
    token: {
        type: Sequelize.STRING

    },
    senha: {
        type: Sequelize.STRING,


    }
})

module.exports = User