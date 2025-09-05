const express = require('express')
const { default: mongoose, get } = require('mongoose')
const app = express()
const port = 3000
const Blog = require ('./models/blogModel.js')
const blogRoutes = require('./routes/blogRoutes')
const methodOverride = require('method-override');

// const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://blog-user:a6HiqQqXvqVmhGJ6@blog0.ho1tvum.mongodb.net/'

mongoose.connect(dbURI)
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))

//listen for requests       
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//static middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


//morgan middleware for logging
var morgan = require('morgan')
app.use(morgan('tiny'))

// method-override middleware
app.use(methodOverride('_method'));

//setting up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

// routes
app.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', text: 'About Us' });
});

// Use blog routes
app.use('/blogs', blogRoutes)

