var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

router.post('/rating', function(req, res, next)
{
    console.log(req.body);
    var text = "Rating: "+req.body.stars+"\n"+req.body.text;
    sendMail("Rating", text);
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