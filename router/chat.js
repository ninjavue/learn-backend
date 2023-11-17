const express = require('express')
const router = express.Router()


const { getChat, postChat } = require('../controllers/chat')


router
    .route('/')
    .post(postChat)

router
    .route('/:id')
    .get(getChat)


module.exports = router