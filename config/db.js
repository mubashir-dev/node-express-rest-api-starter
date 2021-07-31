const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.' + process.env.MONGO_DB) }
    else { console.log('Error in DB connection : ' + err.stack) }
});

module.exports =
{
    url: mongoose.connection
}


