const express = require('express');
const db = require('../Database/_db');
// const User = require('../Database/Models/userModel');
const {Interest, User} = require('../Database/Models/index');

// This router is mounted on /api/interests
const router = express.Router();


router.get('/', function (req, res, next){
    Interest.findAll()
        .then(function(interest){
            res.send(interest);
        })
});



router.get('/:category', function(req, res, next){
    Interest.findOne({
        where: {category: req.params.category}
    })
        .then(function(interest){
            return interest.getUsers();
        })
        .then(function(users){
            res.send(users);
        })
        .catch(next);
})

// router.post('/:id/update', function(req, res, next){
//     User.findOne({
//         where: {phone: req.params.id}
//     })
//         .then(function(user){
//             console.log('req.body', req.body)
//             // user.setInterest
//         })
// })

//
// router.post('/:category', function (req, res, next){
//     User.create({
//         firstName: req.body.first,
//         lastName: req.body.last,
//         address: req.body.address,
//         phone: req.body.phone,
//         password: req.body.password
//     })
//         .then(function(newUser){
//             if (newUser){
//                 res.status(201).send(newUser);
//             }
//         })
//         .catch(next);
// });

module.exports = router;

