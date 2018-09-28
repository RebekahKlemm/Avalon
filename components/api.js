import openSocket from 'socket.io-client';
let socket = openSocket('192.168.33.104:3008');

function joinAGame(cb) {
    socket.on('assignPlayer', player => cb(null, player));
    socket.emit('join_a_game');
}

function startAGame(cb) {
    socket.on('roomKey', (roomKey, player) => cb(null, roomKey, player));
    socket.emit('start_a_game');
}

function listenForNewPlayers(cb) {
    socket.on('player_joined_the_room', () => {
        return cb();
    });
}

export { joinAGame, startAGame, listenForNewPlayers }
