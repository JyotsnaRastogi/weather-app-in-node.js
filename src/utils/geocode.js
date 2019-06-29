const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +
    '.json?access_token=pk.eyJ1Ijoic2FrdXJhMjAwOSIsImEiOiJjanc1OWV5NXYwczFmNDRtZ3Zlb3Zicm0xIn0.G-R1bwj3teRgmB3PmAdB_Q&limit=1'
    request({ url, json: true }, (error, { body: {features} }) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (!features.length) {
            callback('Unable to find the location, try different search.', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name,
            })
        }
    })
}

module.exports = geocode