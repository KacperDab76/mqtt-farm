var mqtt = require("mqtt");
var options = {
    port: 1883,
    clean: true,
    clientId: "soil_temp_subscriber"
  }

var client  = mqtt.connect(options);

client.on("connect",()=>{
    client.subscribe("/soil/temp",{qos:2});
});

client.on("message",(topic,message)=>{
    // console.log(topic);
    var temp = JSON.parse(message.toString());
    console.log(`Soil temperature ${temp.temp} ${temp.scale}`);
});