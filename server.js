var nodemailer = require('nodemailer');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index1.html");
});

app.post("/submit", function (req, res) {
    //console.log(req);
    console.log(req.body.emailsender);
    console.log(req.body.subject);
   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: req.body.emailsender,
          pass: req.body.password
        }
      });
      
      var mailOptions = {
        from: req.body.emailsender,
        to: req.body.emailreceiver,
        subject: req.body.subject,
        text: req.body.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
          
});

app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});
















// var mysql = require('mysql');
// const { ENGINE_METHOD_ALL } = require("constants");
// const { read } = require("fs");
// app.use(express.static(__dirname + '/public'));

// app.set('view_engine', 'pug');

// var conn = mysql.createConnection({
//     host: 'localhost', // Replace with your host name
//     user: 'root',      // Replace with your database username
//     password: '',      // Replace with your database password
//     database: 'major' // // Replace with your database Name
//   });
  
// conn.connect(function(err) {
//     if (err) throw err;
//     console.log('Database is connected successfully !');
//   });




// app.get("/page2", function (req, res) {
    
//     res.sendFile(__dirname + "/page2.html");
// });

// app.get("/page2/page3", function (req, res) {
    
//     res.sendFile(__dirname + "/page3.html");
// });


// app.post("/page2/submit", function (req, res) {
//     conn.query("select * from users", function(err, row, col) {
//         var i;
//         for(i=0;i<row.length;i++){ 
//             if(row[i].email == req.body.email){   
//                 res.redirect("page3");
//                 break;
//             }
//         }
//         if(i == row.length)
//            res.redirect("/");

//             //if(req.body.email == row.email)
//     });
// });

// app.listen(3000, function () {
//     console.log("Server is running on localhost3000");
// });

// //conn.end();
// module.exports = conn;