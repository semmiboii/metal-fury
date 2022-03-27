const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/codaconDB");

const teamSchema = {
  id: Number,
  img: String,
  username: String,
  title: String,
  description: String
}

const Team = mongoose.model("Team", teamSchema);

app.get("/", function(req,res){
    res.render("home");
})

app.get("/events",function(req,res){
  res.render("event");

  const url = "https://kontests.net/api/v1/all";

  https.get(url, function(response){
        response.on("data", function(data){
          const resdata = JSON.parse(data[0]);
          const resInfo = resdata[0].site;
          console.log(resInfo);
        })
  })

})

app.get("/team", function(req,res){
    res.render("team");

    Team.find({},function(err,foundMember){
      if(!err){
        console.log("Success");
      }
    })
})



app.listen(3000, function(){
    console.log("Server started on port 4000.");
})
