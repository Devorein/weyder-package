## Weyder

### Basic Usage

#### 1. Installation
```cmd
npm install weyder
```

### 2. Using weyder
weyder provides two functions ``geoCode`` and ``foreCast``

#### Configuring the objects
Create a free darksky and mapbox account, copy your own access token and pass to `setAccessToken`, 
```js
setAccessToken("darksky","your_DarkSky_AccessToken")
setAccessToken("mapbox","your_MapBox_AccessToken")
``` 

#### Using the api
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

**TODO**: 
--
1. Get customized data, instead of hard coded json response values
2. Give user much more control over the darksky and mapbox api, by configuring the endpoints.
