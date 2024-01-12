var mqtt = require("mqtt");
var options = {
    port: 1883,
    clean: true,
    clientId: "equipment_subscriber"
  }

var client  = mqtt.connect(options);

client.on("connect",()=>{
    client.subscribe("/equipment/+/location",{qos:1});
    client.subscribe("/equipment/+/status",{qos:1});
});

client.on("message",(topic,message)=>{
    // console.log(topic);
    var topic = topic.split("/");
    // console.log(topic);
    if (topic[3]){

        switch (topic[3]){
            case "location":
                var location = JSON.parse(message.toString());
                console.log(`Location of ${topic[2]} is latitude : ${location.latitude} longitude ${location.longitude}`);
                break;
            case "status" : 
                var status = JSON.parse(message.toString());
                console.log(` ${topic[2]} status is ${status.status}`);
                break;
        
            default:
                console.log("topic unknown");
        }
    }
});