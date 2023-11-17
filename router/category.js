const express = require('express')


const router = express.Router()


const { getCategory, postCategory, putCategory, deleteCategory } = require('../controllers/category')


router
    .route('/')
    .post(postCategory)
    .get(getCategory)

router
    .route('/:id')
    .put(putCategory)
    .delete(deleteCategory)


module.exports = router