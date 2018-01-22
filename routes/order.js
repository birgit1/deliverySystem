var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

router.post('/setOrder', function(req, res, next)
{
    console.log(req.body);
    var text = "Rating: "+req.body.stars+"\n"+req.body.text;

    // check customer valid
    if(req.body.deliveryAddress.city.toUpperCase() !== 'CANMORE')
        res.send("we only deliver in Canmore");
    
    // check if restaurant is open
    var deliveryTime = {};
    if(req.body.deliveryTime == undefined)  
    {
        // delivery asap
        deliveryTime = Date.now();
    }  
    else 
    {
        deliveryTime = req.body.deliveryTime;
    }
    var restaurant = req.body.restaurant;
    Restaurants.find({
        "_id": restaurant,
        "openingHours.weekday": weekday,
        "openingHours.start": { "$lte": queryTime },
        "openingHours.end": { "$gte": queryTime+15 }
    }, function(err, data)
    {
        if(err) {
            return next(err);
        }
        console.log(data);
        // restaurant not available at time
        if(data.length !== 1)
        {
            res.json("restaurant closed, order for a different time");
        }
        // price
        var order = req.body.items;
        var price = 0;
        var emailText = "Order: \n";
        for(var i=0; i<order.length; i++)
        {
            Menu.findById(order.id, function(err, data)
            {
                if(err) return next(err);
                var itemPrice = data.price * order.amount;
                emailText += "\n * "+data.name+"\t"+data.amount+"x\t"+itemPrice+"$\n";
                for(j = 0; j < order.addOn; j++)
                {
                    emailText+= "\t+"+order.addOn.name+"\t"+order.addOn.price+"$\n";
                    itemPrice += order.addOn.price;
                }
                price += itemPrice;
                emailText+= "\tspecialInstructions: "+order.specialInstructions;
                emailText += "\n\t\t"+itemPrice+"$\n";
            })
        }
        emailText += "\n totalPrice: "+price +"$";
        emailText += "\n tax: "+price*0.05 +"$";
        var totalPrice = price+price*0.05;
        emailText += "\n price inc gst: "+totalPrice+"$"
    });
    
    res.send("successful");
});

router.post('/contact', function(req, res, next)
{
    console.log(req.body);
    var text = "Name: "+req.body.name+" Email: "+req.body.email+"\n"+req.body.text;
    sendMail("Contact", text);
    res.send("successful");
});

var sendMail = function(subject, text)
{
    console.log("send email");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'deliverorder2367@gmail.com',
            pass: 'ATuCasaDelivery'
        }
    });

    var mailOptions = {
        from: 'deliverorder2367@gmail.com',
        to: 'kimi_lala21@t-online.de',
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = router;