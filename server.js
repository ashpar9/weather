
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "4bd96c43937569bcaa1dcd62a00949a1";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + ""
    https.get(url, function(response){
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const disc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("The temperature in " + query + " is " + temp + " degrees celcius.");
        res.write(" Weather conditions is " + disc);
        res.send();
      });
    });
  });


app.listen(3000, function(){
  console.log("Server is started on port 3000");
});
