
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then(res => res.json())
.then(data => { 
    console.log(data)
    let bkgImg = data.urls.full
    document.body.style.backgroundImage = `url(${bkgImg})`
})