const express = require('express')
require('dotenv').config()
const { default: mongoose, get } = require('mongoose')
const path = require('path')
const app = express()
const Blog = require ('./models/blogModel.js')
const blogRoutes = require('./routes/blogRoutes')
const methodOverride = require('method-override');


const port = process.env.PORT || 5000

//connect to mongodb
const dbURI = process.env.MONGO_URI

mongoose.connect(dbURI)
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))


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
app.set('views', path.join(__dirname, 'views'));

// routes
app.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog', blog: null, editMode: false });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', text: 'About Us' });
});

// Use blog routes
app.use('/blogs', blogRoutes)

