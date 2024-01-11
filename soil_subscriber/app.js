var mqtt = require("mqtt");
var options = {
    port: 1883,
    clean: true,
    clientId: "soil_subscriber"
  }

var client  = mqtt.connect(options);

client.on("connect",()=>{
    client.subscribe("/soil/#",{qos:1});
});

client.on("message",(topic,message)=>{
    // console.log(topic);
    switch (topic){
        case "/soil/temp" : 
            var temp = JSON.parse(message.toString());
            console.log(`Soil temperature ${temp.temp} ${temp.scale}`);
            break;
        case "/soil/moisture" :
            var moisture = JSON.parse(message.toString());
            console.log(`Soil moisture ${moisture.moisture} ${moisture.scale}`);
            break;
        default:
            console.log("topic unknown");
    }
});