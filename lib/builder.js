const utils = require('./utils')

const MapBoxObject = {
    "domain":`https://api.mapbox.com/geocoding/v5`,
    'endPoint': `mapbox.places`,
    'urlComponent':{
        place: ''
    },
    'queryStringObj':{
        access_token: ``,
        'types':['country','region','place'],
        limit: 1,
    },
    'buildURL':function(){
        return `${this.domain}/${this.endPoint}/${this.urlComponent.place}.json?${utils.convertObjToQS(this.queryStringObj)}`
    },
}

const DarkSkyObject = {
    'domain': `https://api.darksky.net`,
    'endPoint': `forecast`,
    'urlComponent':{
        accessToken: ``,
        lat: 0,
        long: 0,
    },
    'queryStringObj':{
        'exclude': ['minutely','hourly','alerts'],
        'units': 'si'
    },
    'buildURL':function(){
        return `${this.domain}/${this.endPoint}/${this.urlComponent.accessToken}/${this.urlComponent.lat},${this.urlComponent.long}?${utils.convertObjToQS(this.queryStringObj)}`
    },
}

const buildURL = function(url){
    if(url == 'mapbox'){
        return `${MapBoxObject.domain}/${MapBoxObject.endPoint}/${MapBoxObject.urlComponent.place}.json?${utils.convertObjToQS(MapBoxObject.queryStringObj)}`
    }else if(url == 'darksky'){
        return `${DarkSkyObject.domain}/${DarkSkyObject.endPoint}/${DarkSkyObject.urlComponent.accessToken}/${DarkSkyObject.urlComponent.lat},${DarkSkyObject.urlComponent.long}?${utils.convertObjToQS(DarkSkyObject.queryStringObj)}`
    }
}
module.exports = {
    DarkSkyObject,
    MapBoxObject,
    buildURL: buildURL
}