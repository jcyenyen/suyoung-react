import React, { useState, useEffect, useRef } from "react"
import styled from '@emotion/styled';
import { motion } from "framer-motion"
import WeatherIcon from './WeatherIcon';
import { ReactComponent as AirFlowIcon } from './weather-app-images/airFlow.svg';
import { ReactComponent as RainIcon } from './weather-app-images/rain.svg';
import { ReactComponent as RefreshIcon } from './weather-app-images/refresh.svg';
import { ReactComponent as LoadingIcon } from './weather-app-images/loading.svg';
import { ReactComponent as CogIcon } from './weather-app-images/cog.svg';

///CSS in JS 寫法
const WeatherCardWrapper = styled.div`
    position: relative;
    min-width: 150px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};
    box-sizing: border-box;
    padding: 30px 15px;
    border-radius: 1.5rem;
`;

const Location = styled.div`
    font-size: 30px;
    color: ${({ theme }) => theme.titleColor};
    margin-bottom: 10px;
`;

const Description = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 20px;
`;

const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 25px;
`;

const Temperature = styled.div`
    color: ${({ theme }) => theme.temperatureColor};
    font-size: 55px;
    font-weight: 400;
    display: flex;
`;

const Celsius = styled.div`
    font-weight: normal;
    font-size: 20px;
`;

const AirFlow = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
    margin-bottom: 20px;
    margin-top: 10px;

    svg {
        width: 25px;
        height: auto;
        margin-right: 10px;
    }
`;

const Rain = styled.div`
    display: flex;
    align-items: center;
    font-size: 16x;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};

    svg {
        width: 25px;
        height: auto;
        margin-right: 10px;
    }
`;

const Flex = styled.div`
    display: flex;
`;

const Left = styled.div`
    margin: 0px;
`;
const Right = styled.div`
    padding-top: 5px;
    margin-left: 30px;
`;
const Refresh = styled.div`
    position: absolute;
    right: 15px;
    bottom: 15px;
    font-size: 12px;
    display: inline-flex;
    align-items: flex-end;
    color: ${({ theme }) => theme.textColor};

    svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
}

@keyframes rotate {
    from {
        transform: rotate(360deg);
    }
    to {
        transform: rotate(0deg);
    }
}
`;

const Cog = styled(CogIcon)`
    position: absolute;
    top: 12px;
    right: 15px;
    width: 15px;
    height: 15px;
    cursor: pointer;
`;
const WeatherCard = props => {
    
    const { weatherElement, moment, fetchData, setCurrentPage, cityName } = props;
    const {
    observationTime,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
    } = weatherElement;


    const [tempValue, setTempValue] = useState([])
    
    useEffect(() => {
        setTempValue(temperature);
    }, [weatherElement]);


    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 1,
                default: { ease: "linear" },
        }}>
        <WeatherCardWrapper>
            <Cog onClick={() => setCurrentPage('WeatherSetting')} />
            <Flex>
                <Left>
                    <Location>{cityName}</Location>
                    <Description>{description} {comfortability}</Description>
                </Left>
                <Right>
                    <AirFlow>
                        <AirFlowIcon />
                        {windSpeed} m/h
                    </AirFlow>
                    <Rain>
                        <RainIcon />
                        {Math.round(rainPossibility)}％
                    </Rain>
                </Right>
            </Flex>
            <CurrentWeather>
                <Temperature onClick={()=>{
                    setTempValue(20);
                    props.setTempValue(20);
                }}>
                    {Math.round(tempValue)} <Celsius>°C</Celsius>
                </Temperature>
                
                <WeatherIcon
                    currentWeatherCode={weatherCode}
                    moment={moment || 'day'}
                />
            </CurrentWeather>

            <Refresh onClick={fetchData} isLoading={isLoading}>
                最後觀測時間：
                {new Intl.DateTimeFormat('zh-TW', {
                hour: 'numeric',
                minute: 'numeric',
                }).format(new Date(observationTime))}{''}
                {isLoading ? <LoadingIcon /> : <RefreshIcon onClick={()=>{
                    setTempValue(tempValue);
                    props.setTempValue(tempValue);
                }}/>}
            </Refresh>
        </WeatherCardWrapper>
    </motion.div>
);
};

export default WeatherCard;