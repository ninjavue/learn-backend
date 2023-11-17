const express = require('express')
const router = express.Router()


const { createKahoot, getKahoot, deleteKahoot, getOneKahoot } = require('../controllers/kahoot')


router
    .route("/")
    .get(getKahoot)
    .post(createKahoot)

router
    .route('/:id')
    .delete(deleteKahoot)
    .get(getOneKahoot)






module.exports = router

