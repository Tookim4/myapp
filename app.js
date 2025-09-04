const express = require('express')
const { default: mongoose, get } = require('mongoose')
const app = express()
const port = 3000
const Blog = require ('./models/blogModel.js')

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

//setting up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')




// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', text: 'About Us' });
});

// blog routes
app.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});


// fetch all blogs from the database and render the index view
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { blogs: result, header: 'All Blogs', title: 'All Blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
})

// create a new blog post
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        }); 
})

// fetch a single blog by id and render the blog details view
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog: result, header: 'Blog Details', title: 'Blog Details' })
    })
    .catch((err) => {
        console.log(err);
    });
});


// delete a blog post by id
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
        console.log(err);
    });
});



