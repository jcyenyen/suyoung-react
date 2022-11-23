import { useState, useEffect, useCallback } from 'react';

const authorizationKey ='CWB-C61B8169-A760-4AF3-BFE7-FDE4123F4DEE';
const fetchCurrentWeather = locationName => {
    return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`,
    )
    .then(response => response.json())
    .then(data => {
        //定義 `locationData` 把回傳的資料中會用到的部分取出來
    const locationData = data.records.location[0];
        // 將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
    const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
            if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                neededElements[item.elementName] = item.elementValue;
            }
        return neededElements;
        },
        {},
    );
    //回傳要使用到 React 組件中的資料
    return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD,
    };
    });
};
//另一隻api抓 CI=舒適度  Wx=天氣現象  Pop=降雨機率
//
const fetchWeatherForecast = cityName =>{
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
    )
    .then (response => response.json())
    .then(data => {
        const locationData = data.records.location[0];
        const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
                if(['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                    neededElements[item.elementName] = item.time[0].parameter;
                }
                return neededElements;
            },
            {},
        );
        
        return {
            description: weatherElements.Wx.parameterName,
            weatherCode: weatherElements.Wx.parameterValue,
            rainPossibility: weatherElements.PoP.parameterName,
            comfortability: weatherElements.CI.parameterName,
        };
    });
};

const useWeatherApi = currentLocation => {
    const { locationName, cityName } = currentLocation;
    const [weatherElement, setWeatherElement] = useState({
        observationTime: new Date(),
        locationName: '',
        humid: 0,
        temperature: 0,
        windSpeed: 0,
        description: '',
        weatherCode: 0,
        rainPossibility: 0,
        comfortability: '',
        isLoading: true,
    });

    //等待資料回傳後呼叫函式
    const fetchData = useCallback(() => {
        const fetchingData = async () => {
        const [currentWeather, weatherForecast] = await Promise.all([
            fetchCurrentWeather(locationName),
            fetchWeatherForecast(cityName),
        ]);
    //解構賦值...設定狀態
        setWeatherElement({
            ...currentWeather,
            ...weatherForecast,
            isLoading: false,
        });
    };
        setWeatherElement(prevState => ({
            ...prevState,
            isLoading:true,
        }));
        
        fetchingData();
    }, [locationName, cityName]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [weatherElement, fetchData];
};

export default useWeatherApi;