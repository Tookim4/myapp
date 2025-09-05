const express = require('express')
require('dotenv').config()
const { default: mongoose, get } = require('mongoose')
const path = require('path')
const app = express()
const Blog = require ('./models/blogModel.js')
const blogRoutes = require('./routes/blogRoutes')
const methodOverride = require('method-override');


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

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

app.locals.formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Nairobi'
  });
};


// routes
app.get('/create', (req, res) => {
  res.render('create', { title: 'Write Blog', blog: null, editMode: false });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', text: 'This simple blog page was created as part of my journey to learn Node.js and understand how full-stack web applications work. It allows users to create, display, edit, and delete blog posts using a clean and minimal interface. The project focuses on implementing core CRUD functionality while working with Express.js, EJS templates, and MongoDB. It serves as a foundation for learning and experimenting with web development concepts, with plans to add more features in the future such as user authentication and comments.' });
});

// Use blog routes
app.use('/blogs', blogRoutes)

