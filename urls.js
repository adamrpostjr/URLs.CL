const express = require('express');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const bodyParser = require('body-parser');
const yup = require('yup');
const env = require('dotenv').config();
const { nanoid } = require('nanoid');

const Datastore = require('nedb');
const Database = new Datastore({ filename: 'Database.db', autoload: true });

const urls = express();
urls.use(bodyParser.urlencoded({ extended: true }))
urls.use(express.static('public/assets/'));
urls.use(bodyParser.json());

const server = urls.listen(8085, function(){
    console.log("Server started at http://localhost:8085");
});


// -------------------------------------------------

// Validator
// All post run through this
const schema = yup.object().shape({
  slug: yup.string().trim().matches(/^[\w\-]+$/i),
  ref: yup.string().trim().url().required(),
  otu: yup.number().positive().integer().lessThan(3),
});


// --------------------------------------------------

// Index
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
	Database.find({ slug: slug }, function (err, docs) {
		if (err) throw err;
		if (docs.length == 1) {
			console.log('Sent: '+docs[0].ref);
			res.redirect(docs[0].ref)
		} else {
			res.json('404 not found');
		}
	});
}),

// New URL
urls.post('/', slowDown({windowMs: 30 * 1000, delayAfter: 1, delayMs: 500,}), rateLimit({windowMs: 30 * 1000,max: 1}), async (req, res) => {
	var postReq = {'slug': nanoid(4), 'ref': req.body.url,'uses': 0, 'otu':req.body.otu}
	const slug = postReq.slug
	const ref = postReq.ref
	const otu = postReq.otu
  try {
    await schema.validate({
      slug,
      ref,
      otu,
    })
    if (ref.includes('urls.cl')) {
      throw ({'errors':'REALLYYYY? REALLY THO..'});
    }
    Database.find({ slug: slug }, function (err, docs) {
      if (err) throw err;
      if (docs.length == 1) {
        console.log('Exists: '+docs[0].ref);
        res.json('Exists');
      } else {
        var date = new Date();
        var created = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
        Database.insert({slug: slug, ref: ref, otu: otu, uses: 0, created: created});
        res.json({'Created': slug, 'For': ref, 'Allowances': otu, 'FullURL': "urls.cl/"+slug})
      }
    });
  } catch (e) {
    console.log(e.errors);
    // res.json(e.errors)
  }
});
