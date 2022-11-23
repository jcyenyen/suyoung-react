import React, { useEffect, useState } from "react";
import Sun from "../WheaterCard/Sun";
import SunRise from "../WheaterCard/SunRise";
import axios from "axios";

const WheaterCard = () => {
    const [currentSun, setCurrentSun] = useState({
        dataTime: "2022-08-06",
        location: "台北市",
        sunRiseTime: "05:24",
        sunSetTinme: "18:36",
    });

    useEffect(() => {
        const getWheaterData = () => {
            var todayDate = new Date()
                .toLocaleDateString()
                .split("/")
                .join("-");

            const location = [];
            const sunRiseTime = [];
            const sunSetTime = [];

            axios
                .get(
                    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=CWB-C1B66493-77AD-47A1-9DCD-8DDE1B0F2090&offset=0&format=JSON&locationName=&dataTime=${todayDate}&timeFrom=2022-08-03&timeTo=${todayDate}&sort=locationName`
                )
                .then((res) => {
                    // console.log(res.data.records.locations.location);
                    const neededData = res.data.records.locations.location;

                    neededData.map((v, i) => {
                        location.push(v.locationName);
                        sunRiseTime.push(v.time[0].parameter[1].parameterValue);
                        sunSetTime.push(v.time[0].parameter[5].parameterValue);
                    });

                    function getCityData(data) {
                        let cityData = {
                            location: location[data],
                            sunRiseTime: sunRiseTime[data],
                            sunSetTime: sunSetTime[data],
                        };
                        // console.log(cityData);
                        setCurrentSun({ dataTime: todayDate, ...cityData });
                    }
                    getCityData(4);
                })

                .catch((err) => {
                    // console.log("err:", err);
                });
        };

        getWheaterData();
    }, []);

    return (
        <>
            <div className="weather-widget">
                <div className="area-title">{currentSun.dataTime}</div>
                <div className="member-wheater-location">
                    {currentSun.location}
                </div>
                <Sun />
                <SunRise className="sun-rise" />
                <div className="weather-notify">
                    日出時間：{currentSun.sunRiseTime}
                </div>
                <div className="weather-notify">
                    日落時間：{currentSun.sunSetTime}
                </div>
            </div>
        </>
    );
};

export default WheaterCard;
