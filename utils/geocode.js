const https = require('https');
const config = require('../config.json');

const geocode = (address, callback) => {
    const geocodeApiKey = config.geocode_api_key;
    const url = 'https://www.mapquestapi.com/geocoding/v1/address?key=' + geocodeApiKey + '&location=' + encodeURIComponent(address);

    const request = https.request(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            if (body.results[0].locations[0].adminArea5 === '')
                callback('Unable to find location. Try another search.', undefined);
            else {
                const lattitude = body.results[0].locations[0].latLng.lat;
                const longitude = body.results[0].locations[0].latLng.lng;
                callback(undefined, {
                    lattitude,
                    longitude
                });
            }
        })
    });

    request.on('error', (error) => {
        callback('Unable to connect to location services!', undefined);
    });

    request.end();
}

module.exports = geocode;