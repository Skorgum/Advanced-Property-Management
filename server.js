const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require ('nodemailer');
const path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;
var PORT2 = 3030
var db = require("./models");
//app.use(express.static(process.cwd() + "public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
require("./routes/html-routes.js")(app);

//JS routes not ready!!
require("./routes/tenant-api-routes.js")(app);
require("./routes/tickets-api-routes.js")(app);
// require("./routes/")

// placeholder name
//var routes = require("./controllers/controller.js");

//app.use(routes);

// remove ({ force: true}) prior to deployment
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT2, function () {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});

// function test() {
//     console.log(mailerobject)
// }
var mailerobject;
app.post("/api/send", function(req, res){
     mailerobject = req.body;
     console.log(req.body)
    //  test()
    const output2 = `
 <h2>There is a message from your web-site</h2>
 <h3>Contact Details</h3>
 <ul>
 <li>First Nme: ${req.body.fname}</li>
 <li>Last Name: ${req.body.lname}</li>
 <li>Email: ${req.body.email}</li>
 <li>Telephone: ${req.body.phone}</li>
 </ul>
 <h3>Message</h3>
 <p>${req.body.message}</p>
 `;
    // const output2 = JSON.stringify(mailerobject)
 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false, // true for 465, false for other ports
//   the following will be added via dotenv:
  auth: {
      user: '', // generated ethereal user
      pass: ''  // generated ethereal password
  },
  tls:{
    rejectUnauthorized:false
  }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Message Delivery" <info@alexmojnov.com>', // sender address
    to: 'alexmojnov@gmail.com', // list of receivers
    subject: 'Contcat Form Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output2 // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    
});

});


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

