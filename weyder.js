const https = require('https');

const {MapBoxObject,DarkSkyObject,buildURL} = require('./lib/builder.js')


const geoCode = (address,callback) => {
    MapBoxObject.urlComponent.place = address
    if(callback == null || callback == undefined && typeof(callback)!=='function'){
        return new Promise((resolve,reject)=>{
            https.get(buildURL('mapbox'), (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    let allData = JSON.parse(data)
                    if(allData.message){
                        reject(allData.message)
                    }else if(allData.features.length==0){
                        reject(`Sorry couldn't find anything of name ${address}`)
                    }else{
                        let {center:[longitude,latitude],place_name} = allData.features[0]
                        const geoCodeInfo = {
                            longitude,
                            latitude,
                            place_name
                        }
                        resolve(geoCodeInfo)
                    }
                })
            }).on('error', (e) => {
                reject(e)
            });
        })
    }else{
        https.get(buildURL('mapbox'), (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                let allData = JSON.parse(data)
                if(allData.message,undefined){
                    callback(allData.message)
                }else if(allData.features.length==0){
                    callback(`Sorry couldn't find anything of name ${address}`,undefined)
                }else{
                    let {center:[longitude,latitude],place_name} = allData.features[0]
                    const geoCodeInfo = {
                        longitude,
                        latitude,
                        place_name
                    }
                    callback(undefined,geoCodeInfo)
                }
            })
        }).on('error', (e) => {
            callback(e,undefined)
        });
    }
}

const foreCast = ({latitude,longitude,place_name:place},callback)=>{
    DarkSkyObject.urlComponent.lat = latitude
    DarkSkyObject.urlComponent.long = longitude
    if(callback == null || callback == undefined && typeof(callback)!=='function'){
        return new Promise((resolve,reject)=>{
            https.get(buildURL('darksky'), (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    let allData = JSON.parse(data)
                    if(allData.error){
                        reject(`Server responded with ${allData.code} ${allData.error}`)
                        
                    }else{
                        let {summary,temperature,precipProbability:rainChance} = allData.currently
                        let forecastInfo = {
                            summary,
                            place,
                            temperature:temperature+'°C',
                            rainChance: (rainChance*100).toFixed(2)+'%'
                        }
                        resolve(forecastInfo)
                    }
                })
            }).on('error', (e) => {reject(e)});
        })
    }else{
        https.get(buildURL('darksky'), (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                let allData = JSON.parse(data)
                if(allData.error){
                    callback(`Server responded with ${allData.code} ${allData.error}`,undefined)
                }else{
                    let {summary,temperature,precipProbability:rainChance} = allData.currently
                    let forecastInfo = {
                        summary,
                        place,
                        temperature:temperature+'°C',
                        rainChance: (rainChance*100).toFixed(2)+'%'
                    }
                    callback(undefined,forecastInfo)
                }
            })
        }).on('error', (e) => {callback(e,undefined)});
    }
}

const setAccessToken = function(obj,token){
    if(obj == 'darksky') DarkSkyObject.urlComponent.accessToken = token 
    else if(obj == 'mapbox') MapBoxObject.queryStringObj.access_token = token
}

module.exports = {
    geoCode,
    foreCast,
    setAccessToken
};