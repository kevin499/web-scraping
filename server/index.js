const express = require('express')
const scrapers = require('./scrapers')

const app = express()

app.get('/', async (req, res) => {
    let search = req.query.search.replace(/ /g, "-")
    const page = req.query.page
    try {
        const channelData = await scrapers.scrapeZJ(search, page)
        res.json(channelData)
    }
    catch (err) {
        console.log(err)
        res.json({ message: "Se produjo un error" })
    }
})


app.listen(process.env.PORT || 8080, _ => {
    console.log("Servidor escuchando en " + (process.env.PORT || 8080))
})


