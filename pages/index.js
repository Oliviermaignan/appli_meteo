import { useState, useEffect } from "react";

import { ErrorScreen } from "../components/ErrorScreen";
import { LoadingScreen } from "../components/LoadingScreen";
import { MainCard } from "../components/MainCard";
import { MetricsBox } from "../components/MetricsBox"
import { MetricsCard } from "../components/MetricsCard"
import { UnitSwitch } from "../components/UnitSwitch"
import { DateAndTime } from "../components/DateAndTime";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";

import { getWeatherDescription, showIconName } from "../services/helpers"

import city from '../utils/city.json';
import styles from "../styles/Home.module.css";

export const App = () => {
    const [cityInput, setCityInput] = useState(city.city);
    const [triggerFetch, setTriggerFetch] = useState(true);
    const [weatherData, setWeatherData] = useState();
    const [unitSystem, setUnitSystem] = useState("metric");

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cityInput }),
            });
            const data = await res.json();
            setWeatherData({ ...data });
            setCityInput("");
        };
        getData();
    }, [triggerFetch]);

    const changeSystem = () =>
        unitSystem == "metric"
            ? setUnitSystem("imperial")
            : setUnitSystem("metric");


    return weatherData && !weatherData.error ? (
        <>
            <div>{ }</div>
            <MainCard
                city={city.city}
                country={city.country}
                description={getWeatherDescription(weatherData)}
                iconName={showIconName(weatherData)}
                unitSystem={unitSystem}
                weatherData={weatherData}
            />
            <ContentBox>
                <Header>
                    <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
                </Header>
                <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
                <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
            </ContentBox>

        </>
    ) : weatherData && !weatherData.error ? (
        <div>weatherData.reason</div>
    ) : (
        <LoadingScreen loadingMessage="Loading data..." />
    );
}

export default App;
