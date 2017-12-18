var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fs = require('fs');
var Restaurants = require('../models/restaurant.js');




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

router.get('/xxx', function(req, res, next)
{
    var date = req.params.date;
    //setOpeningHoursRestaurant();
    var weekday = date.getDay();
    var qTime = date.getHours()*100 + date.getMinutes();
    /*var now = new Date(),
        days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sun'];
        //weekDay = days[now.getDay()];

        //hour = now.getHours(),
        //qTime =
        qTime = 1130;
        weekDay = 'thu';
    console.log("time: "+qTime);*/

        Restaurants.find({
            "openingHours.weekday": weekday,
            "openingHours.start": { "$lte": qTime },
            "openingHours.end": { "$gte": qTime+15 }
    }, function(err, data)
    {
        if(err) {
            return next(err);
        }
        console.log(data);
        res.json(data);
    });

    console.log("done");

});

function setOpeningHoursRestaurant()
{
    Restaurants.create({
            "name": "OpenExpl-3",
            "openingHours": [
                {"weekday": 'thu', "start":1130, "end":2145},
                {"weekday": 'wed', "start":1130, "end":2145}
            ]
        },
        function(err, created) {
            console.log(created);
        }
    );
}

router.get('/storeImg', function(req, res, next)
{
    var img = {};
    img.data = fs.readFileSync('nz.jpg');
    img.contentType = 'image/jpg';
    Restaurants.create({
        "name": "French R",
        "images": img.data
    },
        function(err, created) {
            console.log(created);
        }
    );
});

router.get('/getRestaurantMenu', function(req, res, next)
{

});


// get all restaurants
router.get('/getAllRestaurants', function(req, res, next)
{
    var language = req.params.language;

    Restaurants.find(function(err, data)
    {
        if(err) {
            return next(err);
        }
        var result = [];
        for(var i=0; i<data.length; i++)
        {
            setLanguage(language)
        }
        res.send(result);
    });
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


// get all restaurants with menu and without images
router.get('/getAll', function(req, res, next)
{
   var language = req.params.language;
   Restaurants.find(function(err, data)
   {
       if(err) {
           return next(err);
       }
       var result = setLanguage(removeImages(data), language);
       res.send(result);
   });
});

router.get('/getRestaurants', function(req, res, next)
{
    console.log("START");
    var language = req.params.language;
    console.log(language);

    Restaurants.find(function(err, data)
    {
        if(err) {
            return next(err);
        }
        var restaurants = data;
        /*console.log("GOT RES");
        for(var i=0; i<restaurants.length; i++)
        {
            console.log(i);
            // french
            if(language === 1)
            {
                console.log("set english");
                restaurants[i].lng = restaurants[i].fr;
            }
            else    // english
            {
                console.log("set english");
                restaurants[i]["lng"] = {};
                restaurants[i].lng = restaurants[i].en;
                console.log(restaurants[i].lng);
                console.log(restaurants[i]);
            }
            restaurants[i].en = undefined;
            restaurants[i].fr = undefined;
            restaurants[i].menu = undefined;
            console.log("deleted");
            console.log(restaurants[i]);
        }
        console.log("DONE");
        console.log(restaurants);
        res.send(restaurants);
        /*callbackAssign(data, language, function () {
            console.log("callback");
            console.log(data);

            res.send(setLanguageAndData(data, language));
        });*/
        /*var result = setLanguageRestaurant(data, language);*/

        res.send(data);
    });
});

function setLanguageAndData(data, language)
{
    var restaurants = data;
    for(var i=0; i<restaurants.length; i++)
    {
        // french
        if(language === 1)
        {
            restaurants[i].lng = restaurants[i].fr;
        }
        else    // english
        {
            console.log("set english");
            restaurants[i].lng = restaurants[i].en;
            console.log(restaurants[i].lng);
        }
        delete restaurants[i].en;
        delete restaurants[i].fr;
        delete restaurants[i].menu;
    }
    console.log(restaurants);
    return restaurants;
}

// get all the tags for food (e.g. vegan, vegetarian, ..)
router.get('/tags', function(req, res, next)
{
    Restaurants.find( function(err, data)
    {
        if(err) {
            return next(err);
        }
        //var tags = scanTags(data, req.params.language);
        var tags = [];
        console.log(tags);
        if(tags !== null)
            res.json(tags);
        else
            res.json("NA");
    });
});

function scanTags(data, language)
{
    var tags = [];
    for(var i=0; i<data.length; i++)
    {
        for(var k=0; k<data[i].menu.length; k++)
        {
            if(language === 1){
                for (var j = 0; j < data[i].menu[k].fr.tags.length; j++) {
                    if (!contains(tags, data[i].menu[k].fr.tags[j]))
                        tags.push(data[i].menu[k].fr.tags[j]);
                }
            }
            else {
                for (var j = 0; j < data[i].menu[k].en.tags.length; j++) {
                    if (!contains(tags, data[i].menu[k].en.tags[j])) {
                        tags.push(data[i].menu[k].en.tags[j]);
                    }
                }
            }
        }
    }
    return tags;
}

function contains(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return true;
        }
    }
    return false;
}

function removeImages( restaurants)
{
    for(var i=0; i<restaurants.length; i++)
    {

        delete restaurants[i].images;

        for(var j=0; j<restaurants[i].menu.length; j++)
        {
            delete restaurants[i].menu[j].image;
        }
    }
    return restaurants;
}

function setLanguage( restaurants, language)
{
    for(var i=0; i<restaurants.length; i++)
    {
        // french
        if(language === 1)
        {
            restaurants[i].lng = restaurants[i].fr;
        }
        else    // english
        {
            restaurants[i].lng = restaurants[i].en;
        }
        delete restaurants[i].en;
        delete restaurants[i].fr;
        for(var j=0; j<restaurants[i].menu.length; j++)
        {
            if(language === 1)
            {
                restaurants[i].menu[j].lng = restaurants[i].menu[j].fr;
            }
            else    // english
            {
                restaurants[i].menu[j].lng = restaurants[i].menu[j].en;
            }
            delete restaurants[i].menu[j].en;
            delete restaurants[i].menu[j].fr;
        }
    }
    return restaurants;
}

function setLanguageRestaurant( restaurants, language)
{
    for(var i=0; i<restaurants.length; i++)
    {
        // french
        if(language === 1)
        {
            restaurants[i].lng = restaurants[i].fr;
        }
        else    // english
        {
            restaurants[i].lng = restaurants[i].en;
        }
        delete restaurants[i].en;
        delete restaurants[i].fr;
        delete restaurants[i].menu;
    }
    return restaurants;
}

function callbackAssign(data, language, callback)
{
    callback(data, language);
}

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
        res.json(post);
    });
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
