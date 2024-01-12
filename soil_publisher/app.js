var mqtt = require("mqtt");
var options = {
    port: 1883,
    clean: true,
    clientId: "soil_publisher",
    keepalive: 60
  }

var client  = mqtt.connect(options);

// how many times send data
var loop_length = 100;
// delay between messages (1000 = 1 sec)
var delay  = 1000;

// generate random number 0 to maxValue
function randomNumber (maxValue){
    return Math.floor(Math.random()*(maxValue+1));
}
// when connected publisher starts to send data
client.on("connect",()=>{
    var temp,moisture;
    var i = 0;

    // instead og loop I'm using setInterval to send message once every 1 sek
    var interval  = setInterval(()=>{
        // when i was incresed loop_length times end connection
        // end clear interval to stop repeating
        if (i>loop_length){
            client.end();
            clearInterval(interval);
        }
        else {
            // create objects to send
            temp = JSON.stringify({
                temp: randomNumber(40),
                scale: "C"
            });
            moisture =JSON.stringify({
                moisture: randomNumber(100),
                scale: "%"
            })
            // log them on console for demonstration
            console.log(temp);
            console.log(moisture);
            // publish objects to 2 topics
            // for temp set retain to true
            // for moisture set it to false
            client.publish("/soil/temp",temp,{qos: 2,retain: true});
            client.publish("/soil/moisture",moisture,{qos: 2,retain: false});


        }
        // increase i so loop isn't infinite
        i++;
    },
    delay);

});