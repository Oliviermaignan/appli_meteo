export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

//! cette fct ne me sert pas avec mon nouveau formatage des dates
// export const timeTo12HourFormat = (time) => {
//   let [hours, minutes] = time.split(":");
//   return `${(hours %= 12) ? hours : 12}:${minutes}`;
// };

//!permet de donner la direction du vent lisible par l'humain
export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

//! la fonction est-elle utile sachant que je n'ai pas de timestamp ?
// export const unixToLocalTime = (unixSeconds, timezone) => {
//   let time = new Date((unixSeconds + timezone) * 1000)
//     .toISOString()
//     .match(/(\d{2}:\d{2})/)[0];

//   return time.startsWith("0") ? time.substring(1) : time;
// };
