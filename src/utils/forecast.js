const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=713989e26f9ac52c14b23e20fb33f489&query=' + latitude + ',' + longitude + '&units=m'
    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback ('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback ('Unable to find location. Try another search.', undefined)
        } else {
            callback (undefined, `${body.current.weather_descriptions[0]}. It is currently, ${body.current.temperature} degrees out. It feels ${body.current.feelslike} degrees like out, and the humidity is ${body.current.humidity}%`)
            
        }

    })
}

module.exports = forecast