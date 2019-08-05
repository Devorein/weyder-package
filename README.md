## Weyder

### 1. Installation
```cmd
npm install weyder
```

### 2. Using weyder
```js
const weyder = require('weyder') // OR
const {geoCode,foreCast,setAccessToken,setWeatherDataSpan} = require('weyder');
```
#### Exported values overview
- `geoCode` (location) => [ latitude,longitude ]
- `foreCast` ([ latitude,longitude ]) => weather Information
- `setAccessToken` ("mapbox" || "darksky", mapbox_token || darksky_token)
- `setWeatherDataSpan` ({"currently" || "minutely" || "daily": `boolean`})

#### `setAccessToken`
This function is used to set the access token of mapbox and darksky endpoints

**Create a free darksky and mapbox account, copy your own access token and pass the api name and access token to `setAccessToken`** 
```js
setAccessToken("darksky","your_DarkSky_AccessToken")
setAccessToken("mapbox","your_MapBox_AccessToken")
``` 
#### `setWeatherDataSpan`
Use this function and set appropriate time span to get the more information from the api.

Object properties `currently, minutely, hourly, daily`, value `<boolean>`
```js
setWeatherDataSpan({
    'currently': true,
    'minutely': false,
    'daily': true
})

```
The above sets 
-  `currently = true`, 
-  `minutely = false`, 
-  `hourly = false`, 
-  `daily = true`

---
### 3. Necessary Resources
NOTE: To undestand what `currently, hourly, daily` holds, visit https://darksky.net/dev/docs#data-point

#### Here's a snapshot of `currently`
![currently_data](img/currently.png)

#### Here's a snapshot of `hourly`
![hourly_data](img/hourly.png)

#### Here's a snapshot of `daily`
![daily_data](img/daily.png)

### 4. Basic Usage
#### Using the api (async/await style)
```js
const getWeatherData = async (location) =>{
    const geocode = await geoCode(location)
    const forecast = await foreCast(geocode)
    console.log(forecast)
}
getWeatherData("Austin")
// Output
// {
//     currently: [...],
//     hourly: [...]
//     daily: [...],
// }
```
#### Using the api (promises style)
```js
geoCode('Austin')
.then(geocode => foreCast(geocode))
.then(forecast => {
    console.log(forecast);
})
.catch(e=>{
    console.log(e);
})

// Output
// {
//     currently: [...],
//     hourly: [...]
//     daily: [...],
// }
```

#### Using the api (callbacks style)
```js
geoCode("Austin",(err,geocode)=>{
    if(err) return err
    foreCast(geocode,(err,forecast)=>{
        if(err) return err
        console.log(forecast)
    })
})

// Output
// {
//     currently: [...],
//     hourly: [...]
//     daily: [...],
// }
```

### 5. Total Usage
```js
const {geoCode,foreCast,setAccessToken,setWeatherDataSpan} = require('weyder');

setAccessToken("darksky","your_DarkSky_AccessToken")
setAccessToken("mapbox","your_MapBox_AccessToken")

setWeatherDataSpan({
    'currently': true,
    'minutely': false,
    'daily': true
})

geoCode('Austin')
.then(geocode => foreCast(geocode))
.then(forecast => {
    console.log(forecast);
})
.catch(e=>{
    console.log(e);
})

// Output
// {
//     currently: [...],
//     hourly: [...]
//     daily: [...],
// }
```
**TODO**: 
--
1. Still thinking :^)