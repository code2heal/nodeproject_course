const express = require('express');

var app = express();
//make a reqquest to a server

//From Localhost:3000.... Navigate To public/help.html
app.use(express.static(__dirname + '/public')); // __ double underscore dirname etc.

app.get('/', (request, response)=>{ // '/'..signifies tshe home page
  //Request....e.g request method, headers, body infos, path etc
  //Response...... Result of the request made including all contents of the http body
  // response.send('<h1>Hello World!</h1>'); //send back text/html Response
//Send Back json file
  response.send({
    name: 'Abdul',
    likes: [
    'reading',
    'Writting',
    'dancing',
    'singing',
    'jumping'
  ],
    name: 'Malik',
    likes: [
    'Running',
    'Racing',
    'Wrestling',
    'Cooking',
    'Speaking'
  ]

});
});

//creating another Page
app.get('/about', (request, response)=>{
  response.send('<h1>About Page</>');
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
