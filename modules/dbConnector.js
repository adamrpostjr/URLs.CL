require('dotenv').config()
const { response } = require('express');
const { nanoid } = require('nanoid')
const yup = require('yup')
const tools = require('./tools.js');
const db = require('monk')(process.env.MONGOURI)
var urls = db.get('urls')

const slugs = [] // keep a cache of slugs to make this run faster --- coming soon
const schema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    ref: yup.string().trim().url().required()
});
var genid = () => {
    var rand =  Math.floor(Math.random() * (7 - 3) + 3)
    return nanoid(rand)
}




async function saveURL(url) {
    return new Promise( async function(resolve, reject) {
        var slug = genid()
        var ref = url
        var time = tools.getTime(12)
        var date = tools.getDate('short')
        var dateTime = time.hour+":"+time.minute+":"+time.second+":"+time.meridiem+" "+date.month+"-"+date.day+"-"+date.year

        try {
            await schema.validate({
                slug,
                ref
            })
            if (ref.includes('urls.cl')) {
                resolve({'message':'REALLYYYY? REALLY THO...'})
            }
            urls.findOne({slug: slug}).then((doc)=>{
                if (!doc) {
                    urls.insert({
                        'url': ref,
                        'slug': slug,
                        'DateTime': dateTime
                    }).then((docs)=>{
                        resolve({'url': docs.url, 'slug': docs.slug})
                    })
                    //continue
                } else {
                    console.log('Exists: ', doc.slug)
                    url(ref)
                }
            })
        } catch (e) {
            resolve(e)
        }


    })
}
async function findURL(slug) {
    return new Promise( async function(resolve, reject) {
        urls.findOne({ slug: slug }).then((doc) => {
            if (doc) {
                resolve({url: doc.url, slug: doc.slug})
            } else {
                resolve({'url': 'Not Found'})
            }
        })
    })
}

module.exports = { saveURL, findURL }