const express = require('express')
const router = express.Router()



const { getAllUser, getUser, postUser, settingUser, avatarUser, deltetUser, editUser,adminUser, chatFonUser,deleteFon } = require('../controllers/user')


router
    .route('/')
    .post(postUser)
router
    .route('/:id')
    .delete(deltetUser)
    .put(editUser)
router
    .route('/all')
    .get(getAllUser)
    .put(getAllUser)
router
    .route('/:id')
    .get(getUser)
router
    .route('/setting/:id')
    .post(settingUser)
router
    .route('/avatar/:id')
    .put(avatarUser)
router
    .route('/fon/:id')
    .put(chatFonUser)
    .delete(deleteFon)
router
    .route('/admin/:id')
    .put(adminUser)


    
module.exports = router