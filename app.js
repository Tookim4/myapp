const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//static middleware
app.use(express.static('public'))

//morgan middleware for logging
var morgan = require('morgan')
app.use(morgan('tiny'))

//setting up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')


app.get('/', (req, res) => {
    const blogs = [
        { title: 'My first day in school', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'I am King', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'I am the Creator', snippet: 'Lorem ipsum dolor sit amet consectetur' }
    ]
    //   res.send('Hello World!')
    res.render('index', { header: 'Home', title: 'My BLOG', blogs })
})

app.get('/about', (req, res) => {
    //   res.send('Hello World!')
    res.render('about', { header: 'About Me', title: 'About Me', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })
})

app.get('/createBlog', (req, res) => {
    //   res.send('Hello World!')
    res.render('createBlog', { header: 'Create Blog', title: 'Create Blog' })
})


// 404 page, This is a middleware
app.use((req, res) => {
    res.status(404).render('404', { header: '404' , title: '404' , text: 'Page Not Found' })
})
