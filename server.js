// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express')
app=express();

// Start up an instance of app
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000;
const server=app.listen(port, listening);
function listening()
{
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}


app.get('/getJournalDetails', getJournal);
function getJournal(req, res)
{
    console.log("Request sent");
    res.send(projectData);
}

app.post('/postJournalDetails', postJournal);
function postJournal(req,res)
{
    projectData.push(req.body);
    console.log(projectData);
    response.send("Contwent received");
}