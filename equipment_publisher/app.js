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

function randomStatus(){
    var status = (Math.random()>0.5)?"ON":"OFF";
    return status;
}
function randomLocation(){
    var latitude = randomNumber(180)-90;
    var logitude = 
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
            moisture =JSON.stringify({
                moisture: randomNumber(100),
                scale: "%"
            })
            console.log(temp);
            console.log(moisture);
            client.publish("/equipment/harvester/status",temp,{qos: 1,retain: false});
            client.publish("/equipment/harvester/location",moisture,{qos: 1,retain: false});


        }
        i++;
    },
    delay);

});