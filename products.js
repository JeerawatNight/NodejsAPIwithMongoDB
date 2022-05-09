const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/productDBwithNodejs'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

let productSchema = mongoose.Schema({
    id:Number,
    name:String,
    price:Number,
    description:String
})

let Product = mongoose.model("products",productSchema)

module.exports = Product

module.exports.saveProduct = function(model,data){
    model.save(data)
}
