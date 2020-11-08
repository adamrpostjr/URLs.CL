const yup = require('yup');
const { nanoid } = require('nanoid');
const tools = require('./tools.js');

const database = tools.db

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    ref: yup.string().trim().url().required(),
    otu: yup.number().positive().integer().lessThan(3),
});


function genid() {
    var rand =  Math.floor(Math.random() * (7 - 3) + 3)
    return nanoid(rand)
}

async function generalCreate(link, oneTimeUse) {
    return new Promise( async function(resolve, reject) {
        var postReq = {'slug': genid(), 'ref': link, 'otu':oneTimeUse}
        var slug = postReq.slug
        var ref = postReq.ref
        var otu = postReq.otu
        var time = tools.getTime(12)
        var date = tools.getDate('short')
        var dateTime = time.hour+":"+time.minute+":"+time.second+":"+time.meridiem+" "+date.month+"-"+date.day+"-"+date.year
        try {
            await schema.validate({
                slug,
                ref,
                otu,
            })
            if (ref.includes('urls.cl')) {
                resolve({'message':'REALLYYYY? REALLY THO...'})
            }
            database.find({ slug: slug }, function (err, docs) {
                if (err) console.log(err);
                if (docs.length == 1) {
                    console.log('Exists: '+docs[0].ref);
                    resolve({'message':'exist'})
                } else {
                    database.insert({slug: slug, ref: ref, otu: otu, data: {createdAt: dateTime }});
                    resolve({'message':{'created': slug, 'for': ref, 'allowances': otu, 'fullURL': "urls.cl/"+slug}})
                }
            });
        } catch (e) {
            resolve(e)
        } 
    })
}


module.exports = { generalCreate }