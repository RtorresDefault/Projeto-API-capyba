const porta = 3333

const database = require('./config/db')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../doc/swagger_output.json')
const app = express()
const controllerLivros = require('./controller/livros.controller')
const controllerUser = require('./controller/user.controller')
const middlewareAutentication = require('./User/middlewares.autentication')
const userAutentication = require('./User/user.Autentication')
const bodyParser = require('body-parser')
require('./redis/blacklist')
const { userAutentication } = require('./User')
//Creat database, if don't exist.
database.sync()
app.use(express.json())
app.use('/livros/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/livros', controllerLivros)
app.use('/usuario', controllerUser)
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`)
})