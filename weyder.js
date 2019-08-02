const https = require('https');

const {MapBoxObject,DarkSkyObject,buildURL} = require('./lib/builder.js')


const geoCode = (address,callback) => {
    MapBoxObject.urlComponent.place = address
    return new Promise((resolve,reject)=>{
        https.get(buildURL('mapbox'), (resp) => {
            let data = '';
    
            resp.on('data', (chunk) => {
                data += chunk;
            });
    
            resp.on('end', () => {
                let allData = JSON.parse(data)
                if(allData.features.length==0){
                    reject(`Sorry couldn't find anything of name ${address}`)
                }else{
                    let {center:[longitude,latitude],place_name} = allData.features[0]
                    const geoCodeInfo = {
                        longitude,
                        latitude,
                        place_name
                    }
                    if(callback == null || callback == undefined && typeof(callback)!=='function'){
                        resolve(geoCodeInfo)
                    }else{
                        callback(undefined,coords)
                    }
                }
            })
        }).on('error', (e) => {
            if(callback == null || callback == undefined && typeof(callback)!=='function'){
                reject(e)
            }else{
                callback(e,undefined)
            }
        });
    })
}

const foreCast = ({latitude,longitude,place_name:place},callback)=>{
    DarkSkyObject.urlComponent.lat = latitude
    DarkSkyObject.urlComponent.long = longitude
    return new Promise((resolve,reject)=>{
        https.get(buildURL('darksky'), (resp) => {
            let data = '';
    
            resp.on('data', (chunk) => {
                data += chunk;
            });
    
            resp.on('end', () => {
                let allData = JSON.parse(data)
                if(allData.error){
                    if(callback == null || callback == undefined && typeof(callback)!=='function'){
                        reject(`Server responded with ${allData.code} ${allData.error}`)
                    }else{
                        callback(`Server responded with ${allData.code} ${allData.error}`,undefined);
                    }
                }else{
                    let {summary,temperature,precipProbability:rainChance} = allData.currently
                    let forecastInfo = {
                        summary,
                        place,
                        temperature:temperature+'°C',
                        rainChance: (rainChance*100).toFixed(2)+'%'
                    }
                    if(callback == null || callback == undefined && typeof(callback)!=='function'){
                        resolve(forecastInfo)
                    }else{
                        callback(undefined,forecastInfo)
                    }
                }
            })
        }).on('error', (e) => {
            if(callback == null || callback == undefined && typeof(callback)!=='function'){
                reject(e)
            }else{
                callback(e,undefined)
            }
        });
    })
}

module.exports = {
    geoCode,
    foreCast,
    MapBoxObject,
    DarkSkyObject
};