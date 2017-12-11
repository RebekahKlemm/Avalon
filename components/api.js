import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3008');

function joinAGame(cb) {
    socket.on('assignPlayer', player => cb(null, player));
    socket.emit('join_a_game');
}

function startAGame(cb) {
    socket.on('roomKey', (roomKey, player) => cb(null, roomKey, player));
    socket.emit('start_a_game');
}

export { joinAGame, startAGame }
