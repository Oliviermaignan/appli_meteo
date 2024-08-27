import { useState, useEffect } from 'react'

import { ErrorScreen } from '../components/ErrorScreen'
import { LoadingScreen } from '../components/LoadingScreen'
import { MainCard } from '../components/MainCard'
import { MetricsBox } from '../components/MetricsBox'
import { UnitSwitch } from '../components/UnitSwitch'
import { DateAndTime } from '../components/DateAndTime'
import { ContentBox } from '../components/ContentBox'
import { Header } from '../components/Header'

import { getWeatherDescription, showIconName } from '../services/helpers'

import city from '../utils/city.json'

export const App = () => {
    const [weatherData, setWeatherData] = useState()
    const [unitSystem, setUnitSystem] = useState('metric')

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch('api/data', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })

                if (!res.ok) {
                    throw new Error(`Failed to fetch weather data: ${res.statusText}`);
                }

                const data = await res.json()
                setWeatherData({ ...data })
            } catch (error){
                console.error('Error fetching weather data:', error);
            }
        }
        getData()

        const intervalId = setInterval(getData, 900000)
        return () => clearInterval(intervalId)

    }, [])

    const changeSystem = () =>
        unitSystem == 'metric'
            ? setUnitSystem('imperial')
            : setUnitSystem('metric')

    if (!weatherData) {
        return <LoadingScreen loadingMessage="Loading data..." />
    }

    if (weatherData && weatherData.error) {
        return <ErrorScreen errorMessage={weatherData.reason || 'Failed to load data'} />
    }

    return (
        <>
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
                    <DateAndTime
                        weatherData={weatherData}
                        unitSystem={unitSystem}
                    />
                </Header>
                <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
                <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
            </ContentBox>
        </>
    ) 
}

export default App
