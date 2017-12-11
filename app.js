const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const db = require('./Database/_db');
const newCreateSeeds = require('./Database/seed');
const {Game, Player} = require('./Database/Models/index');

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
io.on('connection', function(client){
    var game = {
        roomKey: Math.round(Math.random() * (90000 - 1000) + 10000)
    };

    var player = {name : null};

    client.on('start_a_game', () => {
        console.log('starting a Game, creating a new player');
        Game.create(game)
            .then(function(newGame){
                game = newGame;
                return Player.create(player);
            })
            .then(function(newPlayer){
                game.addPlayer(newPlayer);
                return newPlayer;
            })
            .then(function(newPlayer){
                client.emit('roomKey', game.dataValues.roomKey, newPlayer.id);
            })
    });

    client.on('join_a_game', () => {
        console.log('creating a new player that is available to join any game');
        Player.create(player)
            .then(function(newPlayer){
                client.emit('assignPlayer', newPlayer.id);
            });
    });


    //Whenever someone disconnects this piece of code executed
    client.on('disconnect', function () {
        console.log('A user disconnected');
    });
});


http.listen(3008, function () {
    console.log('Server is listening on port 3008');
});

//Synch the database
// db.sync()
//     .then(newCreateSeeds)
//     .then(freshDatabase => console.log(`Seeded database OK`))
//     .catch(error => console.error(error));

// Reset the database:
db.sync();



module.exports = app;