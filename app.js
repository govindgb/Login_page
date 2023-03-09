const express = require("express");
const reuest = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { options } = require("request");
const { response } = require("express");
const { request } = require("http");
const { dirname } = require("path");
const app = express();

//1.below code is take all the external or staic file and images and send them with the get req of html file send..
//2.so we will use this code when we send some file to browser and the file contend external file and style
//3.so for do that we create a file let name is "public" and put all external file of "html" use ex - "images and style"
//4.in the public folder and than use thi app.use(express.static("public")); to send thamto browser with html file
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firest_name = req.body.firest;
  var last_name = req.body.last;
  var email = req.body.email;
  console.log(firest_name);
  console.log(last_name);
  console.log(email);
  

 var data = {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firest_name,
        LNAME:last_name
      } 
    }
  ]
 } 

var jsonData = JSON.stringify(data);

const url =  "https://us14.api.mailchimp.com/3.0/lists/c057ee8413"; 

const options= {
  method:"POST",
   auth: "govind:b9d07f988057a19685577ecb6c03a80c-us14"
 }

 const request = https.request(url,options,function(response){
   if(response.statusCode == 200)
   {
     res.sendFile(__dirname +"/success.html");
   }
   else{
    res.sendFile(__dirname +"/failure.html");
   }
   response.on("data",function(data){
     console.log(JSON.parse(data));
   });
 })

 request.write(jsonData);
 request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
  console.log("this program is running on port 3000");
});

//api key
// b9d07f988057a19685577ecb6c03a80c-us14

//list id
//c057ee8413

//api2
///b9d07f988057a19685577ecb6c03a80c-us14
