var express = require('express');
var router = express.Router();

var Restaurants = require('../models/restaurant.js');
var Menu = require('../models/menu.js');


// get all restaurants open at specific time
router.get('/restaurants', function(req, res, next)
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
router.get('/getMenu', function(req, res, next)
{
    /*var query = null;
    if(req.query.rids !== undefined)
    {
        var obj_ids = rids.map(function (id) {
            return ObjectId(id);
        });
        console.log("look for id: " + req.query.rids);
        query = {restaurantId: {$in: obj_ids}};
    }
    if( res.query.categories !== undefined)
    {
        query = {category}
    }*/
    Menu.find(query, function(err, data)
    {
        if(err) {
            return next(err);
        }
        for (var i = 0; i < data.length; i++)
            data[i].image = undefined;

        res.send(data);
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