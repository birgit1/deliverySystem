var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Foods = require('../models/foodCategory.js');


// returns all available food cateogries -> search page
router.get('/getFoodCategories', function(req, res, next)
{
   Foods.find(function(err, data)
    {
        if(err) {
            return next(err);
        }
        res.send(data);
    });
});

// adds a new food category
router.post('/addFoodCategory', function(req, res, next)
{
    Foods.create(req.body, function (err, data)
    {
        if(err) {
            console.log("error adding food category");
            return next(err);
        }
        console.log(data._id);
        res.json(data._id);
    });
});

module.exports = router;