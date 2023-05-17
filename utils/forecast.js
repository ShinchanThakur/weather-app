const http = require('http');
const config = require('../config.json');

const forecast = (lattitude, longitude, callback) => {
    const forcastApiKey = config.forecast_api_key;
    const url = 'http://api.weatherstack.com/current?access_key=' + forcastApiKey + '&query=' + lattitude + ',' + longitude;

    const request = http.request(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            if (body.error)
                callback('Unable to find location. Try another search.', undefined);
            else {
                //use weather_icons later
                callback(undefined, {
                    location: body.location.name + ', ' + body.location.country,
                    forecast: body.current.weather_descriptions[0] + ': It is currently ' + body.current.temperature + ' degress out. There is ' + body.current.cloudcover + '% cloud cover.'
                });
            }
        })
    });

    request.on('error', (error) => {
        callback('Unable to connect to weather services!', undefined);
    });

    request.end();
}

module.exports = forecast;