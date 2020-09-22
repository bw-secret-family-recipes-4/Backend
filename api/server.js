require('dotenv').config()
var cors = require('cors')

const express = require('express')
const helmet = require('helmet')


const authRouter = require('../auth/auth-router.js')
const recipesRouter = require('../recipes/recipe-router.js')
const ingredientsRouter = require('../ingredients/ingredients_router')
const instructionsRouter = require('../instructions/instructions-router')
const publicRouter = require('../public/public-router')
const restricted = require('../auth/auth-middleware')
const server = express()
server.use(cors())
server.use(helmet())
server.use(express.json())

server.use('/auth', authRouter)
server.use('/recipes',restricted, recipesRouter)
server.use('/ingredients', restricted, ingredientsRouter)
server.use('/instructions', restricted, instructionsRouter)
server.use('/public', publicRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: "API is working" })
})

module.exports = server