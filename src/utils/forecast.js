const request = require('request')

const forecast = (latitude, longitud ,callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitud}&appid=d4c855575b1c3839bf71c36c349b4d90`
    request({url,json: true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        }else if (body.error) {
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.weather[0].description)
        }
    })
}

module.exports = forecast