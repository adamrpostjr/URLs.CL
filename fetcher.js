const tools = require('./tools.js');
const database = tools.db

function find(slug) {
    let time = tools.getTime(12)
    let date = tools.getDate('short')
    let dateTime = time.hour+":"+time.minute+":"+time.second+":"+time.meridiem+" "+date.month+"-"+date.day+"-"+date.year
    return new Promise( async function(resolve, reject) {
        database.find({ slug: slug }, function (err, docs) {
            if (err) console.log(err);
            if (docs.length == 1) {
                console.log(docs[0].data);
                if (docs[0].data.uses != null) {
                    var uses = docs[0].data.uses+1
                }else {
                    var uses = 1
                }
                database.update({ slug: slug }, { $set: { 'data.uses': uses, 'data.lastUsed': dateTime } }, { multi: false }, function (err, numReplaced) {
                    resolve(docs[0].ref)
                });
            } else {
                resolve({'error':{'message': '404 not found'}})
            }
        })
    })
}
module.exports = { find }