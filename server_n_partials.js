const express = require('express');

const hbs = require('hbs');

//make a reqquest to a server
var app = express();
//make an instance of Partials to load pages dynamically
hbs.registerPartials(__dirname + '/views/partials') //directory containing all objects to be rendered concorrently
//make an instance of hbs
app.set('view engine', 'hbs');
//From Localhost:3000.... Navigate To public/help.html...stativ pages
app.use(express.static(__dirname + '/public')); // __ double underscore dirname etc.
//Create hbs Helper functions to get full year
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

//Create hbs Helper Functions to Change text to Uppercase
hbs.registerHelper('toUpC', (text) =>{
  return text.toUpperCase();
});

//Pass in data into the Home page i.e rendering the Home page Using hbs
app.get('/', (request, response)=>{ // '/'..signifies the home page
  //Request....e.g request method, headers, body infos, path etc
  //Response...... Result of the request made including all contents of the http body
  // response.send('<h1>Hello World!</h1>'); //send back text/html Response
//Send Back json file
  response.render( 'home.hbs', {
    pageTitle: 'home page!',
    welcomeMsg: 'Wellcome To My Javascript webpage'
});
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
app.listen(3000, ()=>{
  console.log('Server Up And running On Port 3000');
}); // though Any Port number could be use and often server dependent
