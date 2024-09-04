const apiKey = "bdf5e3c88867d00cd64d6dddda12c85e"


const weatherDataEle =  document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon  = document.querySelector(".icon")


formEle.addEventListener("submit", (e)=>{
  e.preventDefault();
//console.log(cityNameEle.value);
const cityValue  = cityNameEle.value ;
getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
    if(!response.ok)
    {
      throw new Error("Network Issue");
    }

   const data = await response.json();

console.log(data);
const temperature = Math.floor(data.main.temp)

const description = data.weather[0].description

const icon  = data.weather[0].icon 

const details = [
  `minTemp: ${Math.floor(data.main.temp_min)}°C`,
  `maxTemp: ${Math.floor(data.main.temp_max)}°C`,
  `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
  `Humidity: ${data.main.humidity}%`,
  `Pressure: ${data.main.pressure}`,
  `Wind Speed: ${data.wind.speed}m/s`,


]



weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`

weatherDataEle.querySelector(".desc").textContent = `${description}`

imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="" >`

weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
 return `<div>${detail}</div>`
}).join("");


  }catch(err){
    weatherDataEle.querySelector(".temp").textContent = ""
    imgIcon.innerHTML =""

    weatherDataEle.querySelector(".desc").textContent  = "An error occured"

  }

}