const request = require('request')

const geocode =(address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiemlhZGVsZ2Fuem9yeTc3MCIsImEiOiJjbDhieDdsaGowYmo5M3BueXRnZ3ZvNWF3In0.UgmwvS6Ov9A_m2pl0jMCoQ&limit=1'
    request({ url, json: true},(error, {body}) => {
        if (error){
            callback('Unable to connect to location', undefined)
        }else if(body.features.length===0){
            callback('Unable to connect to location',undefined)
        } else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode