import axios from 'axios';
import {ADD_USER, RECEIVE_USERS, REFRESH_USERS, UPDATEUSERLOGINSTATUS, REGISTER_PLAYER, UPDATE_ALL_PLAYERS} from './constants';

export const registerPlayer = function(player){
    return{
        type: REGISTER_PLAYER,
        player : player
    }
};

export const updateAllPlayers = function(players) {
    return{
        type: UPDATE_ALL_PLAYERS,
        players: players
    }
};

// send name and roomKey
export function registerJoiner(playerId, playerName, roomKey) {
    return function (dispatch) {
        return axios.put('/api/players/' + playerId, {name: playerName, roomKey: roomKey})
            .then(response => response.data)
            .then((newPlayer) => {
                dispatch(registerPlayer(newPlayer));
            })
    }
}

// send only the name, roomKey is already on the player
export function registerOrganizer(playerId, playerName) {
    return function (dispatch) {
        return axios.put('/api/players/' + playerId, {name: playerName})
            .then(response => response.data)
            .then((newPlayer) => {
                dispatch(registerPlayer(newPlayer));
            })
    }
}

// get all players in the game
export function updatePlayers(gameID) {
  return function (dispatch) {
    return axios.get('/api/games/' + gameID +'/players/')
      .then(response => {
          return response.data;
      })
      .then(allPlayers => {
          dispatch(updateAllPlayers(allPlayers));
      })
      .catch(err => {
          console.log('err', err);
      })
  }
}

/////////////////////////FOR REFERENCE/////////////

export const updateUserLoginStatus = function(status, userID){
    return{
        type: UPDATEUSERLOGINSTATUS,
        status: status,
        userID: userID
    }
};

export const addUser = function (user) {
    return {
        type: ADD_USER,
        user: user
    };
};


//asynch action creator (thunk)
export function addUToDb(user){
    return function (dispatch){
        return axios.post('/api/users/signup', user)
            .then(response => response.data)
            .then(function(newUser){
              dispatch(addUser(newUser))
            })
    }
}



export const receiveUsers = function (allUsers) {
    return {
        type: RECEIVE_USERS,
        allUsers: allUsers
    };
};









export const refreshUsers = function (users) {
    return {
        type: REFRESH_USERS,
        users: users
    };
};


export function setSession(user){
    return function (dispatch){
        return axios.post('/api/users/login', user)
    }
}






