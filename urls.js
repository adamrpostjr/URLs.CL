const express = require('express');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');
const creator = require('./creator.js');
const fetcher = require('./fetcher.js');


const urls = express();
urls.use(bodyParser.urlencoded({ extended: true }))
urls.use(express.static('public/assets/'));
urls.use(bodyParser.json());

const server = urls.listen(8085, function(){
    console.log("Server started at https://urls.cl");
});

// Index
urls.get("/", (req, res) => {
   res.sendFile(__dirname+'/public/index.html');
});
urls.get('/favicon.ico', (req,res)=>{
	return 'your favicon'
})

// Redirect
urls.get('/:slug', async (req, res, next) =>{
 const get = await fetcher.find(req.params.slug)
  if (get.error == null) {
    res.redirect(get)
  } else {
    res.json(get.error.message)
  }
})

// New URL
urls.post('/', slowDown({windowMs: 30 * 1000, delayAfter: 1, delayMs: 500,}), rateLimit({windowMs: 30 * 1000,max: 3}), async (req, res) => {
  const genUri = await creator.generalCreate(req.body.url, req.body.otu)
  res.json(genUri.message)
});

// Get URL Stats Basics
urls.get('/API/:slug', (req, res) =>{

})
