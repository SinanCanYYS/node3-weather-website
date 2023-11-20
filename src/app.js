const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const pubicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup express directory to serve
app.use(express.static(pubicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sinan Can'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sinan Can'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Sinan Can'
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address!'
        }) 
    }

    geocode (req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            console.log(location)
            console.log(forecastData)
        })
    })

    // res.send({
    //     location: 'California LA',
    //     tempertature: 50,
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) =>  {
    res.render('404', {
        errorMessage: 'Help article not found!',
        title: '404',
        name: 'Sinan Can'
    })
})

app.get('*', (req, res) =>  {
    res.render('404', {
        errorMessage: 'Page not found!',
        title: '404',
        name: 'Sinan Can'
    }) 
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Sinan',
//         age:50
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })