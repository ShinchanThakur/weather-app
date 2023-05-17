const request = require('postman-request');
const config = require('../config.json');

const forecast = (lattitude, longitude, callback) => {
    const forcastApiKey = config.forecast_api_key;
    const url = 'http://api.weatherstack.com/current?access_key=' + forcastApiKey + '&query=' + lattitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        }
        else if (body.error)
            callback('Unable to find location. Try another search.', undefined);
        else {
            //use weather_icons later
            callback(undefined, {
                location: body.location.name + ', ' + body.location.country,
                forecast: body.current.weather_descriptions[0] + ': It is currently ' + body.current.temperature + ' degress out. There is ' + body.current.cloudcover + '% cloud cover.'
            });
        }
    })
}

module.exports = forecast;