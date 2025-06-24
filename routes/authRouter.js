const express = require('express')
const authRouter = express.Router()
const path = require('path')

const authController = require('../controllers/authController')
// Handle login requests
authRouter.post('/', authController.handleLogin)

module.exports = authRouter