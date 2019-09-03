const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000; //process.env.PORT ....is an enviroment variable set by heroku used to route our app however || 3000 will make the app route locally

//make a reqquest to a server
var app = express();

//make an instance of Partials to load pages dynamically
hbs.registerPartials(__dirname + '/views/partials') //directory containing all objects to be rendered concorrently

//make an instance of hbs
app.set('view engine', 'hbs');

//Express Middlewares 001
app.use((request, response, next)=>{
  var now = new Date().toString();
  console.log(`${now}: ${request.method} ${request.url}`);
  next(); // this realese the stacktrace for other app to function so Very Important!!
});

//Express Middlewares 002
app.use((request, response, next)=>{
  var now = new Date().toString();
  var logmsg = `${now}: ${request.method} ${request.url}`;
  console.log(logmsg);
  fs.appendFile('server.log', logmsg + '\n', (err)=>{
    if (err) {
      console.log('Unable to Append To server.log');
    }
  });
  next(); // That is, make our app assynchronous
});

//Express Middlewares 003...
//next(); was never called here meaning the stacktrace is Not released for Assynchronous activities... every visited page shows the content of maintenance.hbs
app.use((request, response, next)=>{
  response.render('maintenance.hbs');

});

//From Localhost:3000.... Navigate To public/help.html...make a middleware request to static pages
app.use(express.static(__dirname + '/public')); // __ double underscore dirname etc.

//Pass in data into the Home page i.e rendering the Home page Using hbs
app.get('/', (request, response)=>{
  response.render( 'home.hbs', {
    pageTitle: 'home page!',
    welcomeMsg: 'Wellcome To My Javascript webpage'
});
});

//Create hbs Helper functions to get full year
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

//Create hbs Helper Functions to Change text to Uppercase
hbs.registerHelper('toUpC', (text) =>{
  return text.toUpperCase();
});

//Rendering The about Page using Handlebars hbs
app.get('/about', (request, response)=>{
  response.render('about.hbs', {
    pageTitle: 'about me!',

    // welcome: 'Wellcome To My Javascript webpage'
  });
});

app.get('/bad', (request, response)=>{
  response.send({
    error: 'Unable to Handle Request'
  });
});

//while The server listen on a customnise port 3000
app.listen(port, ()=>{
  console.log(`Server Up And running On ${port}`);
}); // though Any Port number could be use and often server dependent
