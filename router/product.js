const express = require('express')
const router = express.Router()



const { postProduct,getOneProduct,getProduct,putProduct,deleteProduct,getCatIdProduct,getIdsProduct } = require('../controllers/product')


router
    .route('/')
    .post(postProduct)
    .get(getProduct)
router
    .route('/:id')
    .delete(deleteProduct)
    .put(putProduct)
router
    .route('/one/:id')
    .get(getOneProduct)
router
    .route('/categoryId/:id')
    .get(getCatIdProduct)
router
    .route('/ids/:ids')
    .get(getIdsProduct)

    
module.exports = router