var express = require('express');
var router = express.Router();

var Restaurants = require('../models/restaurant.js');
var Menu = require('../models/menu.js');


// get all restaurants open at specific time
router.get('/menu', function(req, res, next)
{
    var query = null;
    if(req.params.ids !== undefined)
    {
        var obj_ids = ids.map(function (id) {
            return ObjectId(id);
        });
        console.log("look for id: " + req.params.id);
        query = {rid: {$in: obj_ids}};
    }
    Menu.find(query, function(err, data)
    {
        if(err) {
            return next(err);
        }
        for (var i = 0; i < data.length; i++)
            delete data[i].image;

        res.send(data);
    });
});

// get categories of all/specific food
router.get('/getFoodCategories', function(req, res, next)
{
    Menu.distinct("category.en", function(err, data)
    {
        if(err) {
            return next(err);
        }
        res.json(data);
    });
});

// get attributes of all/specific food
router.get('/getFoodAttributes', function(req, res, next)
{
    Menu.distinct("tags.en", function(err, data)
    {
        if(err) {
            return next(err);
        }
        res.json(data);
    });
});

// get all menu without images only
router.get('/getMenuForRestaurant', function(req, res, next)
{
    var restaurant = mongoose.Types.ObjectId(req.query.restaurant);
    var query = {"restaurantId": restaurant};
    Menu.find(query, function(err, data)
    {
        if(err) {
            return next(err);
        }
        for (var i = 0; i < data.length; i++)
            data[i].image = undefined;

        res.json(data);
    });
});

// add a new menu item to database
router.post('/addMenu', function(req, res, next)
{
    Menu.create(req.body, function (err, post)
    {
        if(err) {
            return next(err);
        }
        res.json(post);
    });
});

// get specific menu item by id
router.get('/:id', function(req, res, next)
{
    Menu.findById(req.query.id, function(err, data)
    {
        if(err) return next(err);
        res.json(data);
    })
});

// set different parameter for menu item
router.put('/:id', function(req, res, next)
{
    Menu.findByIdAndUpdate(req.params.id, req.body, function(err, post)
    {
        if(err)
            return next(err);
        res.json(post);
    })
});

// delete a menu item
router.delete('/:id', function(req, res, next)
{
    Menu.deleteMany(query, function(err, post)
    {
        if(err)
            return next(err);
        res.json(post);
    })
});

module.exports = router;