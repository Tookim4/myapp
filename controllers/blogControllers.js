const Blog = require('../models/blogModel');

const fetch_blogs = (req, res) => {
      Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { blogs: result, header: 'All Blogs', title: 'All Blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
}

const create_blog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        }); 
}

const get_blog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog: result, header: 'Blog Details', title: 'Blog Details' })
    })
    .catch((err) => {
        console.log(err);
    });
}

const delete_blog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
        console.log(err);
    });
}

// Show form for editing an existing blog
const edit_blog_form = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).send('Blog not found');
            }
            // Render the createBlog view but pass blog and editMode flag
            res.render('create', { blog, header: 'Update Blog', title: 'Update Blog', editMode: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Server error');
        });
};

// Update blog in DB
const update_blog = (req, res) => {
    const id = req.params.id;
    const { title, snippet, body } = req.body;

    Blog.findByIdAndUpdate(
        id,
        { title, snippet, body },
        { new: true, runValidators: true }
    )
        .then((result) => {
            if (!result) {
                return res.status(404).send('Blog not found');
            }
            res.redirect(`/blogs`);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Server error');
        });
};

module.exports = {
    fetch_blogs,
    create_blog,
    get_blog,
    delete_blog,
    edit_blog_form,
    update_blog
}   