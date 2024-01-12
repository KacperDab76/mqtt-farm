var mqtt = require("mqtt");
var options = {
    port: 1883,
    clean: true,
    clientId: "equpment_publisher",
    keepalive: 60
  }

var client  = mqtt.connect(options)
var loop_length = 5;
var delay  = 1000;
function randomNumber (maxValue){
    return Math.floor(Math.random()*maxValue+1);
}
function randomPosition(maxValue,precision){
    // value can be +/-
    // and precision guides number of digits after coma
    const multi = 10*precision;
    var num = Math.floor(Math.random()*maxValue*multi)/multi;
    var sign = (Math.random()>0.5)?1:-1;
    return sign*num;
}

function randomStatus(){
    var status = (Math.random()>0.5)?"ON":"OFF";
    return status;
}
function randomLocation(){
    var precision = 4;
    // it's -90 - +90 with precision deciding number of digits after coma
    var latitude = randomPosition(90,precision);
    // +/- 180 with 
    var longitude = randomPosition(180,precision);
    return{latitude,longitude};
}
// when connected publisher starts to send data
client.on("connect",()=>{
    var location,status;
    var i = 0;
    var interval  = setInterval(()=>{
        // when i was incresed loop_length times end connection
        // end clear interval to stop repeating
        if (i>loop_length){
            client.end();
            clearInterval(interval);
        }
        else {
            status = JSON.stringify({
                status: randomStatus()
            });
            location = JSON.stringify({
                ...randomLocation()
            });
            console.log("harvester");
            console.log(status);
            console.log(location);
            client.publish("/equipment/harvester/status",status,{qos: 1,retain: false});
            client.publish("/equipment/harvester/location",location,{qos: 1,retain: false});
            // same for sprinkler
            status = JSON.stringify({
                status: randomStatus()
            });
            location = JSON.stringify({
                ...randomLocation()
            });
            console.log("sprinkler");
            console.log(status);
            console.log(location);
            client.publish("/equipment/sprinkler/status",status,{qos: 1,retain: false});
            client.publish("/equipment/sprinkler/location",location,{qos: 1,retain: false});


        }
        i++;
    },
    delay);

});