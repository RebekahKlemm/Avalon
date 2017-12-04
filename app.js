const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const db = require('./Database/_db');
const newCreateSeeds = require('./Database/seed');

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: false, secret: 'veryhushhush', cookie: { maxAge: 60000 }}));


const apiRouter = require('./routes/apiRouter');

//here are my API routes
app.use('/api', apiRouter);

//Here is where I serve up the first page
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, './components/index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(err.status || 500).send(err);
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});


//Synch the database
db.sync()
    .then(newCreateSeeds)
    .then(freshDatabase => console.log(`Seeded database OK`))
    .catch(error => console.error(error));

// Reset the database:
// db.sync({force: true})

http.listen(3001, function () {
    console.log('Server is listening on port 3001');
});


module.exports = app;