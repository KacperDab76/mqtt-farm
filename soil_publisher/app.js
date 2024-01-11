var mqtt = require("mqtt");
var options = {
    port: 1883,
    clean: true,
    clientId: "soil_publisher",
    keepalive: 60
  }

var client  = mqtt.connect(options)
var loop_length = 5;
var delay  = 1000;
function randomNumber (maxValue){
    return Math.floor(Math.random()*maxValue+1);
}
// when connected publisher starts to send data
client.on("connect",()=>{
    var temp,moisture;
    var i = 0;
    var interval  = setInterval(()=>{
        // when i was incresed loop_length times end connection
        // end clear interval to stop repeating
        if (i>loop_length){
            client.end();
            clearInterval(interval);
        }
        else {
            temp = JSON.stringify({
                temp: randomNumber(40),
                scale: "C"
            });
            moisture =JSON.stringify({
                moisture: randomNumber(100),
                scale: "%"
            })
            console.log(temp);
            console.log(moisture);
            client.publish("/soil/temp",temp,{qos: 1,retain: false});
            client.publish("/soil/moisture",moisture,{qos: 1,retain: false});


        }
        i++;
    },
    delay);

});