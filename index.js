const express=require('express');
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const bodyParser=require('body-parser');

const db=require('./config/mongoose');


const app=express();

const port =5000;


// this is use to set view engine 
app.set('view engine','ejs');
app.set('views','./views');

// this is use to extract css to upper and javascript at lower in  html page 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// this middileware is use to ejs layout 
app.use(expressLayouts);


// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:false}));

// this is used for take static data for frontend page as css javascript  image etc 
app.use(express.static('assets'));

// this middleware use to redirect brower request  to routers 
app.use('/',require('./routers'));


// this is use to listen  server  on given  port 
app.listen(port,(err)=>{
    if(err){
        console.log("somthing went wrong in listening");
    }

    console.log(`server is running on  port : ${port}`);
})