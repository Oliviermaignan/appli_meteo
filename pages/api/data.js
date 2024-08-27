import city from '../../utils/city.json'

export default async function handler(req, res) {
    try {
        const getWeatherData = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.long}&current=apparent_temperature,temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=visibility&daily=weather_code,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=1`
        )
        const data = await getWeatherData.json()

        if (!getWeatherData.ok) {
            throw new Error(
                `Failed to fetch weather data: ${getWeatherData.statusText}`
            )
        }
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching weather data:', error)
        res.status(500).json({
            error: 'An error occurred while fetching weather data.',
        })
    }
}
