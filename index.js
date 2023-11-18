const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors')
const exphbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const helmet = require('helmet')
const compression = require('compression')
const {Router} = require('express')
const router = Router()


app.use(express.json());
app.use(fileUpload())
app.use('/images',express.static('images'))
app.use('/files',express.static('files'))
const hbs = exphbs.create({
    defaultLayout: 'index',
    extname: 'hbs'
})
app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
app.use(cors({
    origin: '*',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials:  true
}))
app.use(helmet())
app.use(compression())

// Import the All router
const pageRouter = require('./router/page')
const userRouter = require("./router/user")
const quesRouter = require("./router/question");
const kahootRouter = require("./router/kahoot");
const commentRouter = require('./router/comment')
const groupRouter = require('./router/group')
const chatRouter = require('./router/chat')
const categoryRouter = require('./router/category')
const productRouter = require('./router/product')
const authROuter = require('./router/auth')

const keys = require('./keys/dev')


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-CSRF-Token');
    // res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


const store = new MongoStore({
    collection: 'session',
    uri: keys.MONGODB_URI
})
app.use(session({
    secret: keys.SESSION_SECRET,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 10,
        secure: false 
    },
    resave:true,
    store
}))


app.use(cookieParser())

app.use((error,req,res,next)=>{
    const message = `This is the unexpected field -> ${error.field}`
    console.log(message)
    next()
})

app.use('/', pageRouter)
app.use("/question", quesRouter);
app.use("/kahoot", kahootRouter);
app.use('/user', userRouter)
app.use('/comment', commentRouter)
app.use('/group', groupRouter)
app.use('/chat', chatRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/login', authROuter)



// server running

const PORT = process.env.PORT || 4000


async function dev(){
    try {
        await mongoose.connect(keys.MONGODB_URI,{useNewUrlParser:true})
        app.listen(PORT,()=>{
            console.log(`Server is running ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
dev()