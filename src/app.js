const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Defin Path for express config
const publicDirpath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars engine and view location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup Static Directory to serve
app.use(express.static(publicDirpath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ziad'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Ziad'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        msg: 'This is my help',
        title: 'Help',
        name: 'Ziad'
    })
})

app.get('/weather',(req, res) => {

    if(!req.query.address) {
        return res.send({
            error:'Adress required to be provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forcastdata,
                location,
                address:req.query.address,
                latitude,
                longitude,
            }) 
        })    
    })
 
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You Must provide Search Term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Ziad',
        errormsg:'Help Article is not Found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Ziad',
        errormsg:'Not Found'
    })
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
} )