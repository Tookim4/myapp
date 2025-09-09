const express = require('express');
const router = express.Router();
const blogControllers = require('../controllers/blogControllers');
const { requireAuth } = require('../middleware/authMiddleware');


// fetch all blogs from the database and render the index view
router.get('/', blogControllers.fetch_blogs);

// User’s Blogs
router.get('/my-blogs', requireAuth, blogControllers.fetch_user_blogs);

// create a new blog post
router.post('/', blogControllers.create_blog);

// fetch a single blog by id and render the blog details view
router.get('/:id', blogControllers.get_blog);

// delete a blog post by id
router.delete('/:id', blogControllers.delete_blog);

// Show edit form
router.get('/:id/edit', blogControllers.edit_blog_form);

// Update a blog
router.put('/:id', blogControllers.update_blog);

// Export the router to be used in app.js
module.exports = router;

