const { argv } = require('process');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');

const app = express();

// const address = argv[2];

// geocode(address, (error, { lattitude, longitude } = {}) => {
//     if (error)
//         return console.log(error);
//     forecast(lattitude, longitude, (error, response) => {
//         if (error)
//             return console.log(error);
//         console.log(response.location);
//         console.log(response.forecast);
//     });
// });

app.get('', (req, res) => {
    res.send({
        message: 'This is home page, it is just for testing purpose'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})