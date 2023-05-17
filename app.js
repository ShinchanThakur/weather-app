const { argv } = require('process');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = argv[2];

geocode(address, (error, { lattitude, longitude } = {}) => {
    if (error)
        return console.log(error);
    forecast(lattitude, longitude, (error, response) => {
        if (error)
            return console.log(error);
        console.log(response.location)
        console.log(response.forecast);
    });
});