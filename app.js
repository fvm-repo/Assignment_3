// Requires
const express = require('express')
const bodyParser = require('body-parser')
const expHandlebars = require('express-handlebars')

const app = express()
const port = 7777
const bpJson = bodyParser.json()
const bpurlencoded = bodyParser.urlencoded({extended:false})

var cachedEntries = []

app.use(bpJson)
app.use(bpurlencoded)

app.engine('handlebars', expHandlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/entries', (req,res)=>{
    cachedEntries.sort((a,b)=>b.highScore-a.highScore)

    res.render('entries', {
        entries:cachedEntries
    })
})

app.post('/entry', (req, res)=>{
    var newEntry = {
        name:req.body.name,
        highScore:req.body.highScore
    }

    cachedEntries.push(newEntry)
    res.redirect('/entries')
})  

app.listen(port, ()=>{
    console.log('Now listening on port ' + port)
})