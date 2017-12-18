var d = new Date();
var n = d.toJSON();
console.log();


Date.prototype.setDay = function(dayOfWeek)
{
    this.setDate(this.getDate() - this.getDay() + dayOfWeek);
};

var calculateTime = function(hour)
{
    var nhour = hour % 12;
    if (nhour === 0)
        nhour = 12;
    return nhour;
};

for(var i=1; i<25; i++)
{
    console.log(i+" - "+calculateTime(i));
}

var myCallback = function(data) {
    console.log('got data in mycallback: '+data);
};

var usingItNow = function(callback) {
    callback('datahere');
};

var counter = function(i)
{
    var j = 0;
    for( i; i<1000; i++)
    {
        j = j+1;
        if(i>= 999)
            console.log(j);
    }
    return j;
};

   // usingItNow(myCallback);

    var func = function()
    {
        var j = 0;
        console.log(counter(1));
        console.log("done");
    };
    func();