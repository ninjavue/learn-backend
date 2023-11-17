const express = require('express')
const router = express.Router()

const { postComment, getComment } = require('../controllers/comment')


router
    .route('/')
    .post(postComment)
router
    .route('/:id')
    .get(getComment)


    module.exports = router