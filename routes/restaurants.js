var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurants = require('../models/restaurant.js');
var RestaurantsTRL = require('../models/restaurantTRL.js');

/* GET  listing. */
/*router.get('/', function(req, res, next)
{
    console.log("listing: ");
    var selectedRestaurants = [ { name: "restaurant#1" }, { name:"restaurant#2" } ];
    var foodTags = [{}]

    var query = { $or: selectedRestaurants };

    Restaurants.find(query, function(err, restaurants)
    {
        if(err) {
            console.log("db err");
            return next(err);
        }
        console.log("db success: ");
        console.log(restaurants);

        res.json(restaurants);
    });

});*/

// get all restaurants
router.get('/getAllRestaurants', function(req, res, next)
{
    var languageOption = 'fr';

        if(languageOption === 'fr')
        {
            Restaurants.aggregate([
                { $lookup:
                    {
                        from: 'restaurantTRL',
                        localField: '_id',
                        foreignField: 'rid',
                        as: 'translation'
                    }
                }
            ], function(err, dataTrans) {
                if (err) throw err;
                console.log(dataTrans);

                var resData = [];
                for(var i=0; i<dataTrans.length; i++)
                {
                    resData[i] = {};
                    if(dataTrans[i].translation.name !== null || dataTrans[i].translation.name.length >= 1)
                        resData[i].name = dataTrans[i].translation.name;
                    else
                        resData[i].name = dataTrans[i].name;
                    resData[i].address = dataTrans[i].address;
                    if(dataTrans[i].translation.info !== null || dataTrans[i].translation.info.length >= 1)
                        resData[i].info = dataTrans[i].translation.info;
                    else
                        resData[i].info = dataTrans[i].info;
                    resData[i].openingHours = dataTrans[i].openingHours;
                    resData[i].pictures = dataTrans[i].pictures;
                }

                res.send(resData);
            });

            }
        else {
            Restaurants.find({}, {menu: 0, updatedAt: 0}, function (err, data) {
                if (err) {
                    return next(err);
                }
                res.send(data);
            });
        }
});

/*
 name: String,
 address: {street: String, PC: String, City:String},
 info: String,
 openingHours: [ {day: Number , hours:[{From: Date, To: Date}]}],
 menu: [{
 name: String,
 nameFR: String,
 info: String,
 desc: String,
 ingredients: [String],
 tags: [String],
 category: [String],
 image: Buffer,
 updatedAt: {type: Date, default: Date.now}
 }],
 pictures: [Buffer],
 */

router.get('/createFrenchRestaurant', function(req, res, next)
{
    Restaurants.cre
});

// get all restaurants
router.get('/getAll', function(req, res, next)
{
   Restaurants.find(function(err, data)
   {
       if(err) {
           return next(err);
       }
       res.send(data);
   });
});

// get all restaurants
router.get('/getAll_fr', function(req, res, next)
{
    Restaurants.find(function(err, data)
    {
        if(err) {
            return next(err);
        }
        RestaurantsTRL.find(function(err, dataFr)
        {
            if(err)
            {
                return next(err);
            }
        })
        res.send(data);
    });
});

// get all the tags for food (e.g. vegan, vegetarian, ..)
router.get('/tags', function(req, res, next)
{
    console.log("food tags: ");
    var tags = [];

    Restaurants.find( function(err, data)
    {
        if(err) {
            return next(err);
        }
        console.log("db success: ");
        console.log(data);

        for(var i=0; i<data.length; i++)
        {
            for(var k=0; k<data[i].menu.length; k++)
            {
                for (var j = 0; j < data[i].menu[k].tags.length; j++)
                    if (!contains(tags, data[i].menu[k].tags[j]))
                        tags.push(data[i].menu[k].tags[j]);
            }
        }
        res.json(tags);
    });
});

function contains(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return true;
        }
    }
    return false;
}

router.post('/addRestaurant', function(req, res, next)
{
    console.log("add restaurant");
    console.log(req.body);
    /*Restaurants.create(req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
    })*/
    res.json("got it");
});

//**  ***********************************************************  **/
router.get('/:id', function(req, res, next)
{
    console.log("id: ");
    Restaurants.findById(req.params.id, function(err, post)
    {
        if(err) return next(err);
        res.json(post);
    })
});

router.put('/:id', function(req, res, next)
{
    Restaurants.findByIdAndUpdate(req.params.id, req.body, function(err, post)
    {
        if(err)
            return next(err);
        res.json(post);
    })
});

router.delete('/:id', function(req, res, next)
{
    console.log("delete: ");
    var query = {tags: ["vegan"]};
    Restaurants.deleteMany(query, function(err, post)
    {
        if(err)
            return next(err);
        res.json("done");
    })
});

module.exports = router;
