const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode= require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to use
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jyotsna Rastogi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jyotsna Rastogi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jyotsna Rastogi',
        msg: 'In case you need any help contact us, we are here for you!'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address found'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
           return res.send({
                error,
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData,
            });
        })
    });
    
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Jyotsna Rastogi',
        errorMessage: 'Help Not found for this'
    })
});

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Jyotsna Rastogi',
        errorMessage: 'Page Not Found'
    })
});

app.listen(port, () => {
    console.log('server is up on port ' + port);
});