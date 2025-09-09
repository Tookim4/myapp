const Blog = require('../models/blogModel');

const fetch_blogs = (req, res) => {
    Blog.find()
        .populate('user', 'username') // Correct usage: just 'username'
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { blogs: result, header: 'All Blogs', title: 'All Blogs' });
        })
        .catch((err) => {
            console.log(err);
        });
}

// Fetch blogs for the currently logged-in user
const fetch_user_blogs = async (req, res) => {
  try {
    if (!res.locals.user) {
      return res.redirect('/login');
    }

    const blogs = await Blog.find({ user: res.locals.user._id })
      .sort({ createdAt: -1 });

    res.render('myblogs', {
      title: 'My Blogs',
      blogs,
      user: res.locals.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

const create_blog = async (req, res) => {
    try {
    if (!res.locals.user) {
      return res.redirect('/login');
    }

    const blog = new Blog({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      user: res.locals.user._id  // Attach logged-in user
    });

    await blog.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating blog');
  }
}

const get_blog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .populate('user', '_id username')
    .then((result) => {
        res.render('details', { blog: result, header: 'Blog Details', title: 'Blog Details' });
    })
    .catch((err) => console.log(err));

}

// Delete blog (only if owner)
const delete_blog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (!res.locals.user || blog.user.toString() !== res.locals.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(id);
    res.json({ redirect: '/blogs' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Show form for editing an existing blog (only if owner)
const edit_blog_form = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    if (!res.locals.user || blog.user.toString() !== res.locals.user._id.toString()) {
      return res.status(403).send('Not authorized to edit this blog');
    }

    res.render('create', { blog, header: 'Update Blog', title: 'Update Blog', editMode: true });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

// Update blog (only if owner)
const update_blog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    if (!res.locals.user || blog.user.toString() !== res.locals.user._id.toString()) {
      return res.status(403).send('Not authorized to update this blog');
    }

    blog.title = req.body.title;
    blog.snippet = req.body.snippet;
    blog.body = req.body.body;

    await blog.save();
    res.redirect('/blogs');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};


module.exports = {
    fetch_blogs,
    fetch_user_blogs,
    create_blog,
    get_blog,
    delete_blog,
    edit_blog_form,
    update_blog
}   