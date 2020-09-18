const express = require('express');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const bodyParser = require('body-parser');
const yup = require('yup');
const env = require('dotenv').config();
const mysql = require('mysql');
const { nanoid } = require('nanoid');

const urls = express();
urls.use(bodyParser.urlencoded({ extended: true }))
urls.use(express.static('public/assets/'));
urls.use(bodyParser.json());

const port = process.env.PORT
const server = urls.listen(8085, function(){
    console.log("Server started at http://svr-post.com:"+port);
});


// -------------------------------------------------

const connection = mysql.createConnection({
  host     : process.env.DBHOST, // if nothing is supplied it will use localhost
  user     : process.env.DBUSR,
  password : process.env.DBPWORD,
  database : process.env.DBNAME
});
connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connection was successfull');
  }
});
// Validator
// All post run through this
const schema = yup.object().shape({
  slug: yup.string().trim().matches(/^[\w\-]+$/i),
  ref: yup.string().trim().url().required(),
  otu: yup.number().positive().integer().lessThan(3),
});


// --------------------------------------------------



urls.get("/", (req, res) => {
   res.sendFile(__dirname+'/public/index.html');
});
urls.get('/favicon.ico', (req,res)=>{
 return 'your favicon'
})
// Redirect
urls.get('/:slug', (req,res,next) =>{
    var slug = req.params.slug
    console.log('Request: /'+slug);
    connection.query('select * from cl where slug=?',[slug], function (error, results, fields) {
      if (error) throw error;
      if (results[0] == null) {
        res.json('404 not found')
        // TODO: build 404
    }else {
      connection.query('update cl set uses = uses + 1 where slug=?',[slug])
      console.log('Sent: '+results[0].ref);
      res.redirect(results[0].ref)

    }
  });
}),
// Post
urls.post('/', slowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500,
}), rateLimit({
  windowMs: 30 * 1000,
  max: 1,
}), async (req, res) => {
  var postReq = {'slug': nanoid(4), 'ref': req.body.url,'uses': 0, 'otu':req.body.otu}
   const slug = postReq.slug
  //const slug = 'AbTpFZ5'
  const ref = postReq.ref
  const otu = postReq.otu
  try {
    await schema.validate({
      slug,
      ref,
      otu,
    })
    if (ref.includes('urls.cl')) {
      throw ({'code': 'ER_WTH','Error':'REALLYYYY? REALLY THO..'});
    }
    await connection.query('INSERT INTO cl (slug, ref, uses, otu) VALUES (?,?,?,?)',[slug, ref, 0, otu] , function (error, results, fields) {
      if (error){
        console.log(error)
        res.json(error)
      }else {
        res.json({'Created': slug, 'For': ref, 'Allowances': otu, 'FullURL': "urls.cl/"+slug})
      }
    });
  } catch (e) {
    console.log(e);
    res.json(e)
  }
});
