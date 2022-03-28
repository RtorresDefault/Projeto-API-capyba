const User = require("../schema/user.schema")
module.exports = {
    cadastrar: (dados) => User.create({ ...dados }),

}