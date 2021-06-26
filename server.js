const express = require('express');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const urls = express();
const db = require('./modules/dbConnector.js')



urls.use(cors())
urls.use(express.static('public'));
urls.use(bodyParser.urlencoded({ extended: true }))
urls.use(bodyParser.json());

// index | svelte app
urls.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// redirection | data storing 
urls.get('/:slug', async (req, res) => {
    var slug = req.params.slug
    var search = await db.findURL(slug)
    if (search.url == 'Not Found') {
        res.status(404)
        res.sendFile(path.resolve(__dirname, 'public', '404.html'));

    } else {
        res.redirect(search.url)
    }
})

// creating a new url
urls.post('/', rateLimit({windowMs: 30 * 1000,max: 3}),async (req, res) => {
    var short = await db.saveURL(req.body.slug)
    res.json(short)
})

urls.listen(8085, () => {
    console.log('Server is up');
});