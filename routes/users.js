const express = require('express');
const db = require('../Database/_db');
const {User} = require('../Database/Models/index');

// This router is mounted on /api/users
const router = express.Router();

router.get('/', function (req, res, next){
    User.findAll()
        .then(function(users){
            res.send(users);
        })
});


router.post('/signup', function (req, res, next){
    // console.log('do I have req.session?', req.session)
    const sess = req.session;
    User.create({
        firstName: req.body.first,
        lastName: req.body.last,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password
    })
        .then(function(newUser){
            if (newUser){
                   sess.user=newUser
                    res.status(201).send(newUser)
                    }

            }
        )
        .catch(next);
});

router.post('/login', function(req, res, next){
    const sess = req.session;
    User.findOne({
        where: {phone: req.body.phone, password: req.body.password}
    })
        .then((user) => {
            sess.user = user;
            res.status(200).send(user);
        })

})

router.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/#/login');
});


function checkSignIn(req, res, next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}


router.get('/:id', checkSignIn, function(req, res, next){
// router.get('/:id', function(req, res, next){
    if(req.session.user.phone === req.params.id){
        User.findOne({
            where: {phone: req.params.id}
        })
            .then(function(user){
                console.log('------------>inside user router /:id, here is req.session', req.session)
                res.send(user);
            })
    } else {
        var err = new Error('Unauthorized');
        next(err);
    }

})




module.exports = router;
