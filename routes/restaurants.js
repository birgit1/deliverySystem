var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Restaurants = require('../models/restaurant.js');
var Menu = require('../models/menu.js');

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

router.get('/', function(req, res, next)
{
    console.log("food tags: ");
    var tags = [];

    Menu.find( function(err, menu)
    {
        if(err) {
            return next(err);
        }
        console.log("db success: ");
        console.log(menu);

        for(var i=0; i<menu.length; i++)
        {
            for(var j=0; j<menu[i].tags.length; j++)
                if(!contains(tags, menu[i].tags[j]))
                    tags.push(menu[i].tags[j]);
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

var createMenu = function(restaurant)
{
    console.log("create menu");
    for(var i=0; i<10; i++)
        Menu.create({"name": "food"+i, "info":"this is food "+i, "ingredients":["apple", "banana", "coconut"], "tags": ["vegan"], "restaurant":restaurant._id});

};

var createRestaurants = function()
{
    console.log("create restaurants");
    for(var i=0; i<10; i++)
        Restaurants.create({"name": "restaurant#"+i, "address":{"street": i+" Avenue", "PC":"123ABC", "City":"Canmore"}, "info":"this is restaurant "+i});
};

router.post('/', function(req, res, next)
{
    Restaurants.create(req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
    })
});

//**  ***********************************************************  **/
router.get('/:id', function(req, res, next)
{
    console.log("id: ");
    Todo.findById(req.params.id, function(err, post)
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
    Restaurants.findByIdAndRemove(req.params.id, req.body, function(err, post)
    {
        if(err)
            return next(err);
        res.json(post);
    })
});

module.exports = router;
