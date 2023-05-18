const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');

const app = express();

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, { lattitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(lattitude, longitude, (error, response) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                location: response.location,
                forecast: response.forecast,
                yourQuery: req.query.address
            })
        });
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})