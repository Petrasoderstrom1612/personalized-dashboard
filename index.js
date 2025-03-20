
const getBkgImg = async () => { 
    try{
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        if (!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json()

            console.log(data)
            let bkgImg = data.urls?.full
            if (bkgImg){
                document.body.style.backgroundImage = `url(${bkgImg})`
            } else{
                console.error("Image URL not found in data")
            }
    }catch (error) {
        console.error("error fetching img", error)
    }
}

getBkgImg()