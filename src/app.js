
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();
const port = process.env.PORT || 8000
//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Dennis Enwiya'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:"About me",
        name: "Dennis Enwiya"
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        message: ' i am here to help',
        title: 'Help',
        name: 'Dennis Enwiya'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
      return res.send({
          error: 'Not a valid address input'
        })
    }
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search tearm'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Dennis Enwiya',
        errorMessage:'404 Help Article Not Found!'
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name:'Dennis Enwiya',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`)
})