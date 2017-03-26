const express = require('express');
const db = require('../Database/_db');
// const Alert = require('../Database/Models/alertModel');
const {Alert, Interest, User, Deadline} = require('../Database/Models/index');


// This router is mounted on /api/alerts
const router = express.Router();


router.get('/', function (req, res, next){
    Alert.findAll({
        include: [Deadline]
    })
        .then(function(alerts){
            res.send(alerts);
        })
});


router.get('/:id', function(req, res, next){
    var alertArray = [];
    User.findOne({where: {phone: req.params.id}})
        .then(function(user){
            user.getInterests()
                .then(function(interests){
                    // console.log('here is interests', interests);
                    interests.map(function(interest, index){
                        // console.log('interests.length = ', interests.length);
                        interest.getAlerts({include: [Deadline]})
                            .then(function(alerts){
                                for(var i = 0; i < alerts.length; i++){
                                    for(var j = 0; j < alertArray.length; j++){
                                        if (alerts[i] === alertArray[j]){
                                            //we've already seen this element, go to next element
                                            return;
                                        }
                                    }
                                    alertArray.push(alerts[i]);
                                }
                                // alertArray.push(alerts);
                                if (index === interests.length -1){
                                    // console.log('here is alertArray.deadline', alertArray[0].dataValues.deadline.due)
                                    res.send(alertArray);
                                }
                            })


                    })
                })
        })





})
// router.get('/:id', function(req, res, next){
//     const alertArray = [];
//     User.findOne({where: {phone: req.params.id}})
//         .then(function(user){
//             user.getInterests()
//                 .then(function(interests){
//                     //for each interest
//                     interests.map(function(interest){
//                         //find ALL alerts (even unrelated ones)
//                         Alert.findAll({
//                             include: Interest
//                         })
//                             .then(function(alerts){
//                                 console.log('here is alerts from api/alerts/:id:', alerts)
//                                 //go through each of these alerts
//                                 return alerts.map(function(alert, index){
//                                     // var cat = alert.dataValues.interests;
//                                     console.log('here is index', index);
//                                     //alert.dataValues.interests is an array!  I have to loop through THAT array.
//
//
//                                     alert.dataValues.interests.map(function(int, index){
//                                         console.log('here is alert categories', int.dataValues.category)
//                                         console.log('here is interest.dataValues.category', interest.dataValues.category)
//                                         if (int.dataValues.category === interest.dataValues.category){
//                                         // if(alert.dataValues.interests[index].dataValues.category === interest.dataValues.category){
//                                             // console.log('inside alertArray push')
//                                             console.log('here is alertArray before', alertArray)
//                                             alertArray.push(alert.dataValues);
//                                             console.log('here is alertArray after', alertArray)
//
//                                         }
//                                     })
//                                     //if the alert category matches the interest category, push it to the array
//
//                                 })
//                             })
//                             .then(function(){
//                                 console.log("here is alertArray that is sent", alertArray);
//                                 res.send(alertArray);
//                             })
//
//                     })
//
//                 })
//
//
//         })
// })

// router.get('/:id', function(req, res, next){
//     Alert.findAll({
//         where: {$or:[{to: req.params.id}, {from: req.params.id}]}
//     })
//         .then(function(alerts){
//             res.send(alerts);
//         })
// })

router.post('/newAlert', function (req, res, next) {
    // console.log("got into newAlert route, req body", req.body);
    var alertBody = req.body[0].body;
    var alertCategories = req.body[1];
    var due = req.body[2];

    var deadline = Deadline.create({due: due});
    var alert = Alert.create({body: alertBody});
Promise.all([deadline, alert])
    .then(function([deadline2, alert2]){
            alert2.setInterests(alertCategories)
            alert2.setDeadline(deadline2)
            deadline2.setAlerts([alert2])
            res.send(alert2)
    })

    // .then(function(){
    //     Alert.findAll({
    //         include: [Deadline]
    //     })
    //         .then(function(allAlerts){
    //             allAlerts.map(function(alert3){
    //                 if(alert3.body === alertBody){
    //                     console.log('inside api routes alert, here is alert3', alert3);
    //                     res.send(alert3)
    //                 }
    //             })
    //
    //         })
    // })

})

//this worked before Deadline nonsense
//     return Alert.create({
//         body: alertBody
//     })
//         .then(function(alert){
//             // console.log('here is alert', alert)
//             alert.setInterests(alertCategories);
//             return alert
//         })
//         .then(function(alert){
//             res.send(alert)
//         })
// })


        // .then(Interest.findAll({where: {category: alertCategories}}))
        //
        // Interest.findAll({where:{category: alertCategories}})
        //     .then(function(interests) {
        //         console.log('here is interests', interests)
        //          interests.map(function (interest) {
        //              interest.getUsers()
        //                 .then(function(users){
        //                     console.log('here is users, expect all three users, one at a time', users)
        //                     users.map(function(user){
        //                         Alert.create({
        //                             // to: user.dataValues.phone,
        //                             // //might have to be user.dataValues.phone
        //                             // from: req.body.from,
        //                             body: alertBody
        //                         })
        //                             .then(function(alert){
        //                                 console.log('here is alert', alert)
        //                                     interest.addAlert([alert])
        //                                     return toSend.push(alert);
        //                             })
        //                     })
        //                 })
        //          })
        //
        //     })
        //         res.send(toSend);





                    // .then(function(){
                    //     // console.log('toSend----------->', toSend)
                    //     // res.send(toSend);
                    // })





// router.post('/newAlert', function (req, res, next){
//     console.log("got into newAlert route, req body interests", req.body.to)
//     let alerts = [];
//     req.body.to.map(interest =>
//         Interest.findOne({where:{category: interest}})
//         // .then(console.log('here is the interest the database found: ', interest)))
//             .then(interest => interest.getUsers())
//             // .then(users => console.log(users)))
//             .then(users => users.map(function(user){
//                  Alert.create({
//                         to: user.phone,
//                         //might have to be user.dataValues.phone
//                         from: req.body.from,
//                         body: req.body.body,
//                     })
//                         .then(function(alert){
//                             alerts.push(alert)
//                         })
//                      .then(console.log('here is alerts', alerts))
//                 }
//             ))
//             .then(function(){
//                 console.log('AAAAAAAAAlerts', alerts)
//                     res.status(201).send(alerts);
//             })
//             .catch(next)
//     )



    // req.body.interests.map(interest =>
    //     Interest.findOne({where:{category: interest}})
    //         .then(interest => interest.getUsers())
    //         .then(users => users.map(user => Alert.create({
    //             to: user.phone,
    //             from: req.body.from,
    //             body: req.body.body,
    //         })))
    //         .then(function(newAlert){
    //             if (newAlert){
    //                 res.status(201).send(newAlert);
    //             }
    //         })
    // )
    //     .catch(next);
// });


// router.post('/newAlert', function (req, res, next){
//     Alert.create({
//         to: req.body.to,
//         from: req.body.from,
//         body: req.body.body,
//     })
//         .then(function(newAlert){
//             if (newAlert){
//                 res.status(201).send(newAlert);
//             }
//         })
//         .catch(next);
// });


// router.get('/:id', function(req, res, next){
//     Alert.findAll({
//         where: {to: req.params.id}
//     })
//         .then(function(alerts){
//             res.send(alerts);
//         })
// })

module.exports = router;

