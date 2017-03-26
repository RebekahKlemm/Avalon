/**
 * Created by rebekahklemm on 12/21/16.
 */
const express = require('express');
const db = require('../Database/_db');
const {User, LatLong} = require('../Database/Models/index');

// This router is mounted on /api/addressDetails
const router = express.Router();

router.get('/', function (req, res, next){
    LatLong.findAll()
        .then(function(latLong){
            res.send(latLong);
        })
});

router.get('/validate', function(req, res, next){
    // var latLong;
    // console.log('inside /api/addressDetails/validate api route')
    // var googleMapsClient = require('@google/maps').createClient({
    //     key: 'AIzaSyBFetAhXRcymhUCT9_2_k-nEs8TEkDiOo8'
    // });
    // const OpenStates = require('openstates');
    // var openstates = new OpenStates('abc');
    //
    // googleMapsClient.geocode({
    //     address: req.body.address
    // }, function(err, response) {
    //     if (err) {
    //         // alert('Please enter a valid U.S. address')
    //         // throw new Error('Please enter a valid U.S. address')
    //         res.send('invalid')
    //     }
    //     else{
    //         latLong = response.json.results[0].geometry.location
    //     }
    // });
    //
    // openstates.geoLookup(latLong.lat, latLong.lng, function(err, json) {
    //     // alert('Please enter a valid U.S. address')
    //     // throw new Error('Please enter a valid U.S. address')
    //     res.send('invalid')
    // });
    // res.send('valid');
    console.log('inside routes addressDetails');
res.send('valid');
})

module.exports = router;
