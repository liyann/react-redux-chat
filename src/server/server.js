import express from "express"
import {Server} from "http"
var app = express()
var http = Server(app);

// configs
var rootPath = require('path').normalize(__dirname, '.../..')
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static(rootPath + '/public'))

var io = require('socket.io')(http);
import {makeStore} from "./store"
import listenWebsocket from "./io"

const store = makeStore();
listenWebsocket(io, store);

app.get('/', (req, res) => {
    res.render('index')
})

// var io=require('socket.io')(http) io.on('connection',(socket)=>{
// console.log('a user connect') }) io.on('disconnect',()=>{
// console.log('user disconnect') })
app.listen(3000, () => {
    console.log('listen on port 3000')
})
