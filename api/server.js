require('dotenv').config()

const express = require('express')
const helmet = require('helmet')

const authRouter = require('../auth/auth-router.js')
const recipesRouter = require('../recipes/recipe-router.js')
const ingredientsRouter = require('../ingredients/ingredients_router')
const instructionsRouter = require('../instructions/instructions-router')

const server = express()

server.use(helmet())
server.use(express.json())

server.use('/auth', authRouter)
server.use('/recipes', recipesRouter)
server.use('/ingredients', ingredientsRouter)
server.use('/instructions', instructionsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: "API is working" })
})

module.exports = server