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
