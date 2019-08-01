## Weyder

### Basic Usage

#### 1.Installation
```cmd
npm install weyder
```

#### 2.Requiring the module
```js
const weyder = require('weyder') 
// OR
const {geoCode,foreCast,DarkSkyObject,MapBoxObject} = require('weyder')
```

### Using weyder
weyder provides two functions ``geoCode`` and ``foreCast`` along with two objects ``DarkSkyObject`` and ``MapBoxObject``

#### Configuring the objects
```js
DarkSkyObject.setAccessToken("your_DarkSky_AccessToken")
MapBoxObject.setAccessToken("your_MapBox_AccessToken")
``` 

#### Using the api
```js
geoCode('location',(err,geocode)=>{
    if(!err){
        foreCast(geocode,(err,forecast)=>{
            console.log(forecast);
        })
    }
})
// Output
// {
//     summary: 'Humid and Mostly Cloudy',
//     place: 'Austin, Texas, USA',
//     temperature: '25.12°C',
//     rainChance: '5.00%'
// }
```


