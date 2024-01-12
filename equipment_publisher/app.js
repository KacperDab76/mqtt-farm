var mqtt = require("mqtt");
var options = {
    port: 1883,
    clean: true,
    clientId: "equpment_publisher",
    keepalive: 60
  }

var client  = mqtt.connect(options)
// how many times readings will be send
var loop_length = 100;
// delay between messages 0.5 sec
var delay  = 500;

// function returns random number +/- maxValue with precision number of digits
// to emulate longitude and latitude 
function randomPosition(maxValue,precision){
    // value can be +/-
    // and precision guides number of digits after coma
    const multi = Math.pow(10,precision);
    var num = Math.floor(Math.random()*maxValue*multi)/multi;
    var sign = (Math.random()>0.5)?1:-1;
    return sign*num;
}

// randomly returns on/off status
function randomStatus(){
    var status = (Math.random()>0.5)?"ON":"OFF";
    return status;
}
// retruns location as {latitude,logitude}
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

    // instead of loop I'm using setInterval
    var interval  = setInterval(()=>{
        // when i was incresed loop_length times
        //  end client connection
        // and clear interval to stop repeating
        if (i>loop_length){
            client.end();
            clearInterval(interval);
        }
        else {
            // prepare objects with data for harvester
            status = JSON.stringify({
                status: randomStatus()
            });
            location = JSON.stringify({
                ...randomLocation()
            });
            // log them on console
            console.log(`harvester ${status}`);
            console.log(location);
            // publish harvester data
            client.publish("/equipment/harvester/status",status,{qos: 2,retain: false});
            client.publish("/equipment/harvester/location",location,{qos: 2,retain: true});
            // same for sprinkler
            status = JSON.stringify({
                status: randomStatus()
            });
            location = JSON.stringify({
                ...randomLocation()
            });
            console.log(`sprinkler ${status}`);
            console.log(location);
            // publish sprinkler data
            client.publish("/equipment/sprinkler/status",status,{qos: 2,retain: false});
            client.publish("/equipment/sprinkler/location",location,{qos: 2,retain: true});


        }
        // increase i 
        i++;
    },
    delay);

});