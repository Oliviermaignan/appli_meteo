import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentTime, timezone) =>
  unitSystem == "metric"
    ? unixToLocalTime(currentTime, timezone)
    : timeTo12HourFormat(unixToLocalTime(currentTime, timezone));

export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";


    // !a modifier
export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  return weekday[
    new Date((weatherData.Date + weatherData.timezone) * 1000).getUTCDay()
  ];
};

export const getWeatherDescription = (weatherData) => {
  if (weatherData){
    switch (weatherData.daily.weather_code[0]) {
      case 0:
        return "Clear sky";
  
      case 1:
        return "Mainly clear";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
  
      case 45:
          return "Fog";
      case 48:
        return "Depositing rime fog";
  
      case 51:
        return "Drizzle: light";
        case 53:
        return "Drizzle: moderate";
      case 55:
        return "Drizzle: dense intensity";
  
      case 56:
        return "Freezing Drizzle: Light";
      case 57:
        return "Freezing Drizzle: dense intensity";
  
      case 61:
        return "Rain: slight";
      case 63:
        return "Rain: moderate";
      case 65:
        return "Rain: heavy intensity";
  
      case 66:
        return "Freezing Rain: Light";
      case 67:
        return "Freezing Rain: heavy intensity";
  
      case 71:
        return "Snow fall: Slight";
      case 73:
        return "Snow fall: moderate";
      case 75:
        return "Snow fall: heavy intensity";
  
      case 77:
        return "Snow grains";
  
      case 80:
        return "Rain showers: Slight";
      case 81:
        return "Rain showers: moderate";
      case 82:
        return "Rain showers: violent";
  
      case 85:
        return "Snow showers slight";
      case 86:
        return "Snow showers heavy";
  
      case 95:
        return "Thunderstorm: Slight or moderate";
  
      case 96:
        return "Thunderstorm with slight hail";
      case 99:
        return "Thunderstorm with heavy hail";
  
      default:
        return "Unknown weather condition";
    }
  } else {
    throw new Error('Une erreur est survenue');
  }
}

export const showIconName = (weatherData) => {

  const isNight = ()=>{
    return new Date(weatherData.daily.sunset[0]) < Date.now();
  }
  
  if (weatherData){
    switch (weatherData.daily.weather_code[0]) {
      case 0:
        return isNight() ? "01n" : "01d";
  
      case 1:
      case 2:
        return isNight() ? "02n" : "02d";
      case 3:
      case 45:
      case 48:
        return isNight() ? "03n" : "03d";
  
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return "09d";
  
      case 71:
      case 73:
      case 75:
        return "13d";
  
      case 77:
        return "13d";
  
      case 80:
      case 81:
      case 82:
        return "09d";
  
      case 85:
      case 86:
        return "13d";
  
      case 95:
      case 96:
      case 99:
        return "11d";
  
      default:
        return "Unknown weather condition";
    }
  } else {
    throw new Error('Une erreur est survenue');
  }
}
