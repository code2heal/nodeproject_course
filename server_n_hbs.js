const express = require('express');

const hbs = require('hbs');

var app = express();
//make a reqquest to a server
//make an instance of Partials to load pages dynamically
hbs.registerPartials(__dirname + '/views/partials') //directory containing all objects to be rendered concorrently
//make an instance of hbs
app.set('view engine', 'hbs');
//From Localhost:3000.... Navigate To public/help.html
app.use(express.static(__dirname + '/public')); // __ double underscore dirname etc.

//Pass in data into the Home page i.e rendering the Home page Using hbs
app.get('/', (request, response) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});



/*!

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});


*/
//Rendering The about Page using Handlebars hbs
app.get('/about', (request, response)=>{
  response.render('about.hbs', {
    pageTitle: 'About Me',
    currentYear: new Date().getFullYear()
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
