// generic reportOrders that shows your orders to the function
 var reportOrders = function(minionOrders) {
    if ( typeof minionOrders === "string"){
        console.log(minionOrders);
    }
    else if ( typeof minionOrders === "object"){
        for (var item in minionOrders) {
            console.log(item + ": " + minionOrders[item]);
        }
    }
    return 0;
};

var calculateTime = function(hour)
{
    var nhour = hour % 12;
    if (nhour === 0)
        nhour = 12;
    return nhour;
};

var speakOrder = function(order, callback)
{
    console.log("do");
   callback(order);
   console.log("done");
};

speakOrder({name: "dong", do:"jump"}, reportOrders);