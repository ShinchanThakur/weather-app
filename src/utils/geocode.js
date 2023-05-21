const request = require('postman-request');
const config = require('../../config/config.json');

const geocode = (address, callback) => {
    const geocodeApiKey = config.geocode_api_key;
    const url = 'https://www.mapquestapi.com/geocoding/v1/address?key=' + geocodeApiKey + '&location=' + encodeURIComponent(address);

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        }
        else if (response.body.results[0].locations[0].adminArea5 === '')
            callback('Unable to find location. Try another search.', undefined);
        else {
            const lattitude = response.body.results[0].locations[0].latLng.lat;
            const longitude = response.body.results[0].locations[0].latLng.lng;
            callback(undefined, {
                lattitude,
                longitude
            });
        }
    })
}

module.exports = geocode;