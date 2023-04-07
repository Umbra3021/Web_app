const express=require("express");
const app =express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(express.static(__dirname + '/'))

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    

    });  
app.post("/",function(req,res){

    
    const cityName=req.body.city;
    const api="ee70144a84e33851dbb5a64573e0ec75";
    const unit="metric";
    const URL="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+api+"&units="+unit;
    
    https.get(URL,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const weather_des=weatherData.weather[0].description;
            const temp=weatherData.main.temp;
            const fl=weatherData.main.feels_like;
            const max_temp=weatherData.main.temp_max;
            const min_temp=weatherData.main.temp_min;
            const wind=weatherData.wind.speed;
            const icon=weatherData.weather[0].icon;
            const imgurl=" http://openweathermap.org/img/wn/"+icon+"@4x.png";
            res.write("<h1 style='color:#4B56D2;text-align:center'>The temperature in " +cityName+" is " + temp +"</h1>");
            res.write("<img src= "+ imgurl+" style='margin-left:43%'>");
            res.write("<h2 style='color:#5DA7DB;text-align:center'>Weather is " + weather_des + "</h2>");
            res.write("<h2 style='color:#5837D0;text-align:center'>Feels like " + fl + "</h2>"); 
            res.write("<h2 style='color:#4B56D2;text-align:center'>Max and Min temperature is " + max_temp + " and " + min_temp + "</h2>");
        })
     })

})    
app.listen(3000,function(){
    console.log("Running");
})