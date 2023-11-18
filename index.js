const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose');
const helmet = require('helmet')
const compression = require('compression')

app.use(express.json());
app.use(fileUpload())
app.use('/images',express.static('images'))
app.use('/files',express.static('files'))
app.use(cors({
    origin: '*',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials:  true
}))
app.use(helmet())
app.use(compression())

// Import the All router
const userRouter = require("./router/user")
const quesRouter = require("./router/question");
const kahootRouter = require("./router/kahoot");
const commentRouter = require('./router/comment')
const groupRouter = require('./router/group')
const chatRouter = require('./router/chat')
const categoryRouter = require('./router/category')
const productRouter = require('./router/product')
const authROuter = require('./router/auth')


// MongoDB connection
const MONGO_URL = "mongodb+srv://umrzoq:umrzoq2002@cluster2.iugrir8.mongodb.net/?retryWrites=true&w=majority";

async function dev() {
    try {
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Mongodb Connect'))
        .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
}

dev();

app.use("/question", quesRouter);
app.use("/kahoot", kahootRouter);
app.use('/user', userRouter)
app.use('/comment', commentRouter)
app.use('/group', groupRouter)
app.use('/chat', chatRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/login', authROuter)


io.on('connection', (socket) => {
    console.log('a user connected');
});




// server running

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('Server ishga tushdi');
});
