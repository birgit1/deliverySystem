var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fs = require('fs');
var Restaurants = require('../models/restaurant.js');


// get all restaurants open at specific time
router.get('/getOpenRestaurants', function(req, res, next)
{
    var date = req.params.date;
    var weekday = date.getDay();
    var queryTime = date.getHours()*100 + date.getMinutes();

    Restaurants.find({
        "openingHours.weekday": weekday,
        "openingHours.start": { "$lte": queryTime },
        "openingHours.end": { "$gte": queryTime+15 }
    }, function(err, data)
    {
        if(err) {
            return next(err);
        }
        console.log(data);
        res.json(data);
    });
});


// get categories of all/specific restaurants
router.get('/getRestaurantCategories', function(req, res, next)
{
    console.log("1");
    var query = null;
    if(req.query.ids !== undefined)
    {
        var obj_ids = ids.map(function (id) {
            return ObjectId(id);
        });
        console.log("look for id: " + req.params.id);
        query = {_id: {$in: obj_ids}};
    }
    console.log(query);
    Restaurants.distinct("category.en", query, function(err, data)
    {
        if(err) {
            return next(err);
        }
        console.log(data);
        res.json(data);
    });
});


// get all restaurant with or without images only --> wrk
router.get('/getRestaurants', function(req, res, next)
{
    var sendImage = req.query.sendImage;

    console.log("1 image: "+sendImage);
    Restaurants.find(function(err, data)
    {
        if(err) {
            return next(err);
        }
        console.log("2 image: "+sendImage);
        if(req.params.sendImage === false) {
            for (var i = 0; i < data.length; i++)
                delete data[i].images;
        }
        res.send(data);
    });
});

// add a new restaurant to database --> wrk
router.post('/addRestaurant', function(req, res, next)
{
    console.log("add restaurant");
    console.log(req.body);
    console.log(req.body.name);

    Restaurants.create(req.body, function (err, post)
    {
        if(err) {
            console.log("error adding restaurant");
            return next(err);
        }
        console.log("restaurant created");
        console.log(post);
        res.json(post);
    });
});

// get restaurant by id
router.get('/:id', function(req, res, next)
{
    console.log("id: ");
    Restaurants.findById(req.params.id, function(err, post)
    {
        if(err) return next(err);
        res.json(post);
    })
});

// set different parameter for restaurant
router.put('/:id', function(req, res, next)
{
    Restaurants.findByIdAndUpdate(req.params.id, req.body, function(err, post)
    {
        if(err)
            return next(err);
        res.json(post);
    })
});

// delete a restaurant
router.delete('delete/:id', function(req, res, next)
{
    console.log("delete");
    Restaurants.deleteMany( function(err, post)
    {
        if(err)
            return next(err);
        res.json("done");
    })
});

module.exports = router;
