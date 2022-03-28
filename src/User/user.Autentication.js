const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bearerStrategy = require('passport-http-bearer').Strategy

const usuario = require('./user.model')
const { InvalidArgumentError } = require('../erros')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const blacklist = require('../../redis/blacklist.manipulate')
const User = require('../schema/user.schema')

function userVerify(user) {
    if (!user) {
        throw new InvalidArgumentError('Não existe usuario com este email')

    }

}
async function tokenBlacklistVerify(token) {
    const tokenBlacklist = await blacklist.haveToken(token)
}

async function passwordVerify(password, hashPassword) {
    const validPassword = await bcrypt.compare(password, hashPassword)
    if (!validPassword) {
        throw new InvalidArgumentError('E-mail ou senha inválidos')
    }
}

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        },
        async (email,password,done)=>{
            try {
                const user = await user.emailsearch (email)
                userVerify(user)
                await passwordVerify (password,hashPassword)

                done(null, user)
            } catch (erro){
                done(error)
            }
        }
    )
)
passport.use(
    new BearerStrategy(
      async (token, done) => {
        try {
          await tokenBlacklistVerify(token);
          const payload = jwt.verify(token, process.env.CHAVE_JWT);
          const user = await user.Idsearch(payload.id);
          done(null, user, { token: token });
        } catch (erro) {
          done(erro);
        }      
      }
    )
  )