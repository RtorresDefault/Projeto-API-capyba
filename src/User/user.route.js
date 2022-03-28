const userController = require('./user.controller')
const middlewareAutentication = require('./middleware.autentication')

module.exports = app => {
    app
        .route('/user/login')
        .post(middlewareAutentication.local, userController.login)

    app
     .route('/user/logout')
     .get(middlewareAutentication.bearer, userController.logout)

    app
     .rout('/user')
     .post(userController.adiciona)
     .get(userController.lista)

    app
     .route('/user/:id')
     .delete(middlewareAutentication.bearer, userController.delete)
}