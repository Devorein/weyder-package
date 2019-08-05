# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

**From [1.0.0 - 1.0.2] I forgot what I changed sorry, I wasn't taking much care about keeping a changelog file:(**

## [2.0.0] - 2019-08-04
- Added promise support
- Removed exporting `MapBoxObject` and `DarkSkyObject`
- Returns a promise if a callback is not used !
- Removed unnecessary dependencies !
- `setAccessToken` can now be used to set access token

## [2.1.0] - 2019-08-05
- Throw error if access token is not set for any of the api
- Added functionality to get the weather data of a given time span eg: currently, hourly, daily
- `foreCast` returns all the data instead of handpicked data, so you as a developer can pick the data that you want 

## [2.1.1] - 2019-08-05
- Nothing new except for a better README.md file
