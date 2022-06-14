//https://zellwk.com/blog/crud-express-mongodb/
//npm init
//npm install express --save

// console.log('May Node be with you')
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
require('dotenv').config()
const PORT = 3000

//set EJS as template engine to generate HTML
app.set('view engine', 'ejs')
//urlencoded method tells bodyParser to extract data from form and add to body property of request object (req.body)
app.use(bodyParser.urlencoded({ extended: true }))
//bodyParser's JSON middleware to allow server to accept/read JSON data
app.use(bodyParser.json())
//express.static - middleware to make dir accessible to public
app.use(express.static('public'))

//database login
const connectionString = process.env.DB_STRING

//connect to db
// MongoClient.connect(connectionString, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
// })

// same as above but with promise instead of callback
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.listen(process.env.PORT || PORT, () => {
            console.log('Listening on 3000')
        })
        
        //sendFile
        app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/index.html')
        // console.log(__dirname)
        db.collection('quotes').find().toArray()
            .then(results => {
                // console.log(results)
                //res.render(view, locals)
                res.render('index.ejs', {quotes: results})
            })
            .catch(error => console.error(error))
        
        })

        app.post('/quotes', (req, res) => {
            console.log(req.body)
            quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                // fix for waiting for response - redirect back to '/' because server does not need to respond to client
                res.redirect('/')
            })
        })
        
        app.put('/quotes', (req, res) => {
            // console.log(req.body)
            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                  $set: {
                    name: req.body.name,
                    quote: req.body.quote
                  }
                },
                {
                  //insert document if no documents can be updated
                  upsert: true
                }
            )
            .then(result => {
                // console.log(result)
                //Success message for update
                res.json('Success')
            })
            .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json(`Deleted Darth Vadar's quote`)
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))


//app.get(endpoint, callback)
//endpoint is what comes after domain name
//callback are instructions if true; takes 2 args req and res

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

//ES6 arrow function
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

//npm install nodemon --save-dev
//'nodemon server.js' same as 'node server.js' but only if installed globally with -g
//can also run nodemon directly from node_modules './node_modules/.bin/nodemon server.js' but not convenient

//add "dev": "nodemon server.js" to scripts to run without node_modules preamble
//now, 'npm run dev' triggers 'nodemon server.js'

// app.post('/quotes', (req, res) => {
//     console.log('Hellooooooooooooooooo!')
// })

//allow express to read data from form
//npm install body-parser --save
//body-parser is a middleware and express uses middleware with .use method.
// Make sure you place body-parser before your CRUD handlers! (e.g. app.get, app.post, app.use, app.listen)
//app.use(bodyParser.urlencoded({ extended: true }))

//npm install mongodb --save
//npm install ejs --save