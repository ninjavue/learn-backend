const express = require('express')
const router = express.Router()



const {postGroup, getGroup } = require('../controllers/group')


router
    .route('/')
    .post(postGroup)
router
    .route('/:id')
    .get(getGroup)

    
module.exports = router