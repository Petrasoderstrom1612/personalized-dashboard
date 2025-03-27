# personalized-dashboard chrome extension for checking bitcoin rates and weather all using async api calls

comments to manifest.json that creates extension

{
    "manifest_version": 3, //always use the latest one
    "name": "Personalized Dashboard",
    "version": "1.0.0", //you update it yourself when you release a new version, it is just for your tracking purposes
    "description": "Async JS",
    "action": {
        "default_icon": "icon.png"
    },
    "chrome_url_overrides": {
        "newtab": "index.html" //where the new tab should open
    }
}
