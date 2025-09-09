const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Database connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => console.log(`🚀 App running on http://localhost:${port}`));
  })
  .catch((err) => console.error('❌ DB connection error:', err));

// --------- MIDDLEWARE --------- //

// Static files
app.use(express.static('public'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Logging
app.use(morgan('tiny'));

// Method override for PUT/DELETE in forms
app.use(methodOverride('_method'));

// EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global helper for formatting dates in views
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

// --------- ROUTES --------- //

// Attach user info to res.locals
app.use(checkUser);

// Home redirect
app.get('/', (req, res) => res.redirect('/blogs'));

// Blog creation page (protected)
app.get('/create', requireAuth, (req, res) => {
  res.render('create', { title: 'Write Blog', blog: null, editMode: false });
});

// About page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    text: 'This simple blog page was created as part of my journey to learn Node.js and understand how full-stack web applications work. It allows users to create, display, edit, and delete blog posts using a clean and minimal interface. The project focuses on implementing core CRUD functionality while working with Express.js, EJS templates, and MongoDB. It serves as a foundation for learning and experimenting with web development concepts, with plans to add more features in the future such as user authentication and comments.'
  });
});

// Blog & Auth routes
app.use('/blogs', blogRoutes);
app.use(authRoutes);
