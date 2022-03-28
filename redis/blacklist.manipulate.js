const blacklist = require('./blacklist')

const { promisify } = require('util')
const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function tokenHashGenerator(token) {
    return createHash('sha256')
        .update(token)
        .digest('hex')
}

module.exports = {
    add: async token => {
        const expirationDate = jwt.decode(token).exp
        const tokenHash = geraTokenHash(token)
        await setAsync(tokenHash, '')
        blacklist.expireat(tokenHash, expirationDate)
    },
    containsToken: async token => {
        const tokenHash = geraTokenHash(token)
        const result = await existsAsync(tokenHash)
        return result === 1
    }
}