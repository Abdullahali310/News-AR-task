const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const publicDirectory = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
const hbs = require('hbs')
const request = require('request')
const url = 'https://newsapi.org/v2/top-headlines?country=eg&apiKey=8cfcb05b187a45368edccc4d8785937b'
const Handlebars = require('Handlebars')


app.use(express.static(publicDirectory))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
Handlebars.registerPartial(
    "article",
    "{{article.title}}, {{article.description}} , {{article.urlToImage}} "
)


app.get('/news', (req, res) => {

    request({
        url,
        json: true
    }, (error, response) => {

        if (error) {
            console.log('error has occured')
        } else if (response.body.message) {
            console.log('Your API key is invalid or incorrect.')
        } else if (response.body.articles.lenght == 0) {
            console.log("invalid search");
        } else {
            res.render('news', {
                news: response.body.articles

            })
        }

    })

})


app.get('/', (req, res) => {

    res.render('index', {

        name: 'Abdullah Ramadan'
    })
})


app.listen(port, () => {
    console.log(`server is running`)
})