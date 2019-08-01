const request = require('request');

const {MapBoxObject,DarkSkyObject,buildURL} = require('./lib/builder.js')

const geoCode = (address,callback) => {
    MapBoxObject.urlComponent.place = address
    request({'url':buildURL('mapbox'),'json':true},(err,{body:res_body})=>{
        if(err){
            callback(err,undefined)
        }else if(res_body.features.length==0){
            callback(`Sorry couldn't find anything of name ${res_body.query}`,undefined);
        }else{
            let {center:[longitude,latitude],place_name} = res_body.features[0]
            const geoCodeInfo = {
                longitude,
                latitude,
                place_name
            }
            callback(null,geoCodeInfo)
        }
    })
}

const foreCast = ({latitude,longitude,place_name:place},callback)=>{
    DarkSkyObject.urlComponent.lat = latitude
    DarkSkyObject.urlComponent.long = longitude
    request({'url':buildURL('darksky'), 'json': true},(err, {body:res_body})=>{
        if(err){
            console.log(`Error Found!\n${err}`);
        }else if(res_body.error){
            console.log(`Server responded with ${res_body.code} ${res_body.error}`);
        }else{
            let {summary,temperature,precipProbability:rainChance} = res_body.currently
            let forecastInfo = {
                summary,
                place,
                temperature:temperature+'°C',
                rainChance: (rainChance*100).toFixed(2)+'%'
            }
            callback(forecastInfo)
        }
    })
}

module.exports = {
    geoCode,
    foreCast,
    MapBoxObject,
    DarkSkyObject
};