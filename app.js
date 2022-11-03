
// require packages used in the project
const express = require('express')
const app = express()
const restaurantsList = require('./restaurant.json')
// require express-handlebars here
const exphbs = require('express-handlebars')
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

//querystring 
app.get('/search', (req, res) => {
  console.log('req keyword', req.query.keyword)
  const filterRestaurants = restaurantsList.results.filter((restaurants) => {
    return restaurants.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: filterRestaurants, keyword: req.query.keyword })
})

//params
app.get('/restaurants/:restaurants_id', (req, res) => {
  console.log('req.params.restaurants_id', req.params.restaurants_id)
  const restaurants = restaurantsList.results.find(restaurants => restaurants.id.toString() === req.params.restaurants_id)
  res.render('show', { restaurants: restaurants })
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on  http://localhost:${port}`)
})

