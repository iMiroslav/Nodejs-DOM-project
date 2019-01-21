//Setting up the app


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");


app.set ("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://Lucie:lucinka1991@ds163164.mlab.com:63164/ralawproject");
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false);

//Setting up the database data schema

var contactSchema = new mongoose.Schema 
    ({ name: String,
       email: String,
       number: Number
    
})

var Contact = mongoose.model("Contact", contactSchema);


//Contact routes
app.get("/", function (req, res){
    res.redirect("/kontakty");
});

app.get("/kontakty", function (req, res){
    Contact.find({}, function (err,allContacts){
        if(err){console.log(err);}
        else{res.render("new", {contacts:allContacts});
            
        }
    });
});
  
//New contact
app.post ("/kontakty" , function (req, res){
   var name = req.body.name;
   var email = req.body.email;
   var number = req.body.number;
   
   var newContact ={name: name, email: email, number: number};
   Contact.create(newContact, function(err,newlyCreated){
       if(err){
           console.log(err);
       }
       else {
           res.redirect("/kontakty");
       }
   });
});

// Update contact
app.get("/kontakty/:id/edit", function(req, res){
    Contact.findById(req.params.id, function(err, foundContact){
          if(err){
           res.redirect("/kontakty");
       } else {
        res.render("update", {contact: foundContact});
       }
    });
});

app.put("/kontakty/:id", function(req, res){
    // find and update the correct campground
    Contact.findByIdAndUpdate(req.params.id, req.body.contact, function(err, updatedContact){
       if(err){
           res.redirect("/kontakty");
       } else {
           //redirect somewhere(show page)
           res.redirect("/kontakty");
       }
    });
});

//Destroy contact

app.get("/kontakty/:id/delete", function(req, res){
    Contact.findById(req.params.id, function(err, foundContact){
     if(err){
           res.redirect("/kontakty");
       } else {
        res.render("delete", {contact: foundContact});
       }
    });
});

app.delete("/kontakty/:id", function(req, res){
   Contact.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/kontakty");
      } else {
          res.redirect("/kontakty");
      }
   });
});


//Quiz routes

app.get("/kviz", function(req, res){
    res.render("kviz");
});





app.listen(process.env.PORT, process.env.IP, function (){
    console.log("server started");
});
