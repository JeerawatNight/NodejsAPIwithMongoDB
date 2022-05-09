let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Product = require('./products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    return res.send({
        err: false,
        message: 'Welcome to RESTful CRUD API with NodeJS, Express, MYSQL',
        written_by: 'Jeerawat',
        published_on: 'https://github.com/JeerawatNight'
    })
})

app.get('/products',(req,res)=>{
    Product.find().exec((err,doc)=>{
        if(err)  return res.send('error');
        return res.send(doc);
    })
})

app.get('/products/:id',(req,res)=>{
    let id = req.params.id;

    if(!id){
        return res.status(400).send("Please provide id")
    } else{
        Product.findOne({"id":id}).exec((err,doc)=>{
            if(err) return res.send('error');
            let message = "";
            if(doc === null){
                message = "Product not found";
            } else{
                message = doc;
            }
            return res.send(message);
        })
    }
})

app.post('/product',(req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;

    if(!id || !name || !price || !description){
        return res.status(400).send("Please provide to complete")
    }else{
        Product.insertMany([{"id":id,"name":name,"price":price,"description":description}]).then(()=>{
            Product.find().exec((err,doc)=>{
                if(err)  return res.send('error find');
                return res.send(doc);
            })
        })
    }
})

app.put('/product',(req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;

    if(!id || !name || !price || !description){
        return res.status(400).send("Please provide to complete");
    }else{
        Product.updateOne({id},{$set:{"name":name,"price":price,"description":description}}).then(()=>{
            Product.find().exec((err,doc)=>{
                if(err)  return res.send('error find');
                return res.send(doc);
            })
        })
    }
})

app.delete('/product',(req,res)=>{
    let id = req.body.id;

    if(!id){
        return res.status(400).send({error: true, message: "Please provide product id"});
    }else{
        Product.deleteOne({id}).then(()=>{
            Product.find().exec((err,doc)=>{
                if(err)  return res.send('error find');
                return res.send(doc);
            })
        })
    }
})

app.listen(3000, ()=>{
    console.log('Node App is running on port 3000')
})