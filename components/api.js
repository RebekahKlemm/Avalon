import openSocket from 'socket.io-client';
const socket = openSocket('192.168.33.104:3008');

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

function newPlayerJoined() {
    socket.emit('newPlayerJoined');
}

function registerOrganizer(playerId, playerName, cb) {
  socket.on('organizer_updated', updatedPlayer => {
      cb(null, updatedPlayer);
  });
  socket.emit('register_organizer', playerId, playerName);
}

export { joinAGame, startAGame, listenForNewPlayers, newPlayerJoined, registerOrganizer }
