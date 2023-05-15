const { argv } = require('process');
const geocode = require('./utils/geocode');

const address = argv[2];

geocode(address, (error, response) => {
    if (error)
        return console.log(error);
    console.log(response);
})