let mongoose = require('../mongodb/db')

/**
 * 文章schema
 */
// 4.
let Schema = mongoose.Schema

let articalSchema = new Schema({
    title: String,
    content: String,
    username: String,
    imgUrl: String,
    id: Number
});

// 5. 
var Article = mongoose.model('articles', articalSchema);

module.exports = Article