## Weyder

### Basic Usage

#### 1. Installation
```cmd
npm install weyder
```

### 2. Using weyder
weyder provides two functions ``geoCode`` and ``foreCast``

#### Configuring the objects
**Create a free darksky and mapbox account, copy your own access token and pass the api name and access token to `setAccessToken`** 
```js
setAccessToken("darksky","your_DarkSky_AccessToken")
setAccessToken("mapbox","your_MapBox_AccessToken")
``` 

#### Using the api (using async/await)
```js
const {geoCode,foreCast,setAccessToken} = require('weyder');
const getWeatherData = async (location) =>{
    const geocode = await geoCode(location)
    const forecast = await foreCast(geocode)
    console.log(forecast)
}
getWeatherData("Austin")
// Output
// {
//     summary: 'Humid and Mostly Cloudy',
//     place: 'Austin, Texas, USA',
//     temperature: '25.12°C',
//     rainChance: '5.00%'
// }
```
#### Using the api (using promises)
```js
const {geoCode,foreCast,setAccessToken} = require('weyder');

geoCode('Austin')
.then(geocode=>{
    foreCast(geocode)
    .then(forecast=>{
        console.log(forecast);
    })
    .catch(e=>{
        console.log(e);
    })
})
.catch(e=>{
    console.log(e);
})

// Output
// {
//     summary: 'Humid and Mostly Cloudy',
//     place: 'Austin, Texas, USA',
//     temperature: '25.12°C',
//     rainChance: '5.00%'
// }
```

#### Using the api (using callbacks)
```js
const {geoCode,foreCast,setAccessToken} = require('weyder');
geoCode("Austin",(err,geocode)=>{
    if(err) return err
    foreCast(geocode,(err,forecast)=>{
        if(err) return err
        console.log(forecast)
    })
})
// Output
// {
//     summary: 'Humid and Mostly Cloudy',
//     place: 'Austin, Texas, USA',
//     temperature: '25.12°C',
//     rainChance: '5.00%'
// }
```

**TODO**: 
--
1. Get customized data, instead of hard coded json response values
2. Give user much more control over the darksky and mapbox api, by configuring the endpoints.
