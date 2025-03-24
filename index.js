const author = document.getElementById("author")

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

const getCryptos = async () => {
    try{
        const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
        if (!res.ok){throw new Error (`HTTP error! Status: ${res.status}`)}
        const data = await res.json()
        console.log("bitcoin data", data)
    }
    catch (error) {
        console.error(error)
    }
}

getCryptos()