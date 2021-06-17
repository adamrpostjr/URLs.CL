require('dotenv').config()
const monk = require('monk')

const db = monk(process.env.MONGOURI, (err, db) => {
    console.log(db)
})
// const urls = db.get('urlscl')

// console.log('first', urls)
// urls.find({}).then(() => {
//     console.log('made it here')
// })

// db.close()