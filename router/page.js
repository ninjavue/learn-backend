const {Router} = require('express')
const router = Router() 

const csrf = require('csurf')

router.get('/',  async(req,res)=>{
    res.render('index',{
        title: 'Главная страница '
    })
})


module.exports = router