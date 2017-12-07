var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurants = require('../models/restaurant.js');


router.get('/create', function(req, res, next)
{
   createFrenchRestaurants();
   res.send("restaurants created");
});

router.get('/delete', function (req, res, next) {
    for(var i=0; i<11; i++) {
        var query = {name: 'food' + i};
        Restaurants.deleteMany(query, function (err, post) {
            if (err)
                return next(err);
            console.log(post);
            //res.json("done");
        })
    }
});


var createFrenchRestaurants = function()
{
    console.log("create restaurants");

        Restaurants.create({
            "name": "French R",
            "address": {"street": " Avenue", "PC": "123ABC", "City": "Canmore"},
            "info": "this is restaurant " ,
            "menu": [{
                "name": "FOOD1 of -",
                "info": "this is food number 1 of ",
                "ingredients": ["Tofu", "avocado", "Tomato"],
                "tags": ["vegetarian", "healthy"],
                "category": ["entry"]
            }]
        }, function(err, created)
        {
            console.log(created);
            RestaurantsTRL.create({
                "name": "R Francaise",
                "language": "fr",
                "id": created._id,
                "info": "es una restaurante de la cocina francese ",
                "menu": [{
                    "name": "comida 1",
                    "info": "es la comida 1 ",
                    "ingredients": ["Tofu's", "avocado", "Tomato"],
                    "tags": ["vegetariano", "sanitario"],
                    "category": ["desierto"]
                }]
            });
        });
};

var createRestaurants = function()
{
    console.log("create restaurants");
    for(var i=0; i<10; i++) {
        Restaurants.create({
            "name": "restaurant#" + i,
            "address": {"street": i + " Avenue", "PC": "123ABC", "City": "Canmore"},
            "info": "this is restaurant " + i,
            "menu": [{
                "name": "FOOD1 of -"+i,
                "info": "this is food number 1 of "+i,
                "ingredients": ["Tofu", "avocado", "Tomato"],
                "tags": ["vegetarian", "healthy"],
                "category": ["entry"]
            }]
        });
    }
};

module.exports = router;