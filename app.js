
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");




const app=express();
app.use(bodyParser.urlencoded({extended:true}));




app.post("/",function(req,res)
{
         
     const query=req.body.cityname;
     const apiKey="ef3c3d367be6d43ad482bb90b385e699";
     const unit="metric";
      

    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
    console.log(url);
    
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data)
        {

            const weatherdata=JSON.parse(data);
            console.log(weatherdata);

            if (weatherdata.message==="city not found")
            {
                res.write("<h1>City not found.Please check.</h1>");

            }
            
            
            if (weatherdata.message!=="city not found")
            {
            const temperature=  weatherdata.main.temp;
            const description=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(imageurl);    
            res.write(" <h1>The temperature in "+query+" is "+temperature+" degree Celsius </h1>");
            res.write("<br><p >The weather description is "+description+"</p>");
            res.write("<img src="+ imageurl+">");
            }
    
            res.send();
        });
    });
 

});




app.get("/",function(req,res)
{

 
res.sendFile(__dirname+"/index.html");

});


app.listen(3000,function(){
    console.log("Server started at port 3000.")
});