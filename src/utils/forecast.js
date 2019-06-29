const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/20a2ef83a0f012feceb51d67bf374e5c/' + latitude + ',' + longitude + '?units=si';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error, undefined);
        }
        else {
            const { daily, currently } = body;
            callback(undefined, `${daily.summary} It is currently ${currently.temperature} degrees with ${currently.precipProbability*100} % chance of rain`)    
        }
    })
}

module.exports = forecast