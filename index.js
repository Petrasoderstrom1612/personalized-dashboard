import  {appid } from "./config.js";

console.log(appid)

const author = document.getElementById("author")
const weather = document.getElementById("weather")


//DISPLAY TIME
setInterval (() => { //same to setTimeout (so that it updates every min)
    document.getElementById("time").innerText = `${new Date().toLocaleTimeString("en-US", {timeStyle: "short"})}` //08:59 AM short means no second included
}, 1000)

//DISPLAY BACKGROUND IMG
const getBkgImg = async () => { 
    try{
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        if (!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`) //if the API response is not OK (res.status will give you number) - the server is down or you wrote wrong query it will throw you here => **
        }
        const data = await res.json()

            console.log("bkg image data",data)
            let bkgImg = data.urls?.full
            if (bkgImg){
                document.body.style.backgroundImage = `url(${bkgImg})`
                author.innerText = `By: ${data.user.name}`
            } else{ //if the actual object property does not have image (like the ones I had in movie DB)
                console.error("Image URL not found in data")
                document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDI4MjA5NzV8&ixlib=rb-4.0.3&q=85")` //hardcoded value
            }
        }catch (error) { // ** 
            console.error("error fetching img", error)
            author.innerText = `By: Federico Respini`
            document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDI4MjA5NzV8&ixlib=rb-4.0.3&q=85")` //hardcoded value
    }
}

getBkgImg()

// DISPLAY CRYPTO CURRENCIES
const getCryptos = async () => {
    try{
        const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
        if (!res.ok){throw new Error (`HTTP error! Status: ${res.status}`)}
        const data = await res.json()
        console.log("bitcoin data", data)
        
        document.getElementById("crypto-top").innerHTML = `
        <img src="${data.image.small}" title="${data.name}" alt="${data.name}"/>
        <span>${data.name}</span>
        `
        
        document.getElementById("crypto").innerHTML += `
        <p>💹: ${data.market_data.current_price.sek} SEK</p>
        <p>🔼: ${data.market_data.low_24h.sek} SEK</p>
        <p>🔽: ${data.market_data.high_24h.sek} SEK</p>
        `
    }
    catch (error) {
        console.error(error)
    }
}

getCryptos()

//DISPLAY WEATHER
let latitude
let longitude

const getWeather = async () => {
    navigator.geolocation.getCurrentPosition(async position => { //you need asyn here so it works
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        console.log(latitude, longitude)

        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}&units=metric`)
            if (!res.ok){throw new Error (`HTTP error! Status: ${res.status}`)}
            const data = await res.json()
            console.log("weather data", data)
            weather.innerHTML = 
            `<img class="weather-img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"/>
             <p class="weather-temperature">${Math.round(data.main.temp)} °C</p>
             <p class="weather-city">${data.name}</p>
            `
        }
        catch (error) {
            console.log(error)
        }
    })
}

getWeather()

