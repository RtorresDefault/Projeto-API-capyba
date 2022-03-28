const express = require("express")
const controller = express.Router()
const userService = require("../services/user.service")

controller.post("/", (req, res) => {
    res.send(userService.cadastrar(req.body))
})
module.exports = controller