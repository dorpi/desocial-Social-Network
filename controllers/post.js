
const Post = require('../models/Post');
// Validation
const validatePostInput = require('../validation/post');


// @route   GET api/posts
// @desc    Get posts
// @access  Public
exports.getPosts = (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
}



// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
exports.getPost = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
}

// @route   POST api/posts
// @desc    Create post
// @access  Private
exports.createPost = (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
}


// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
exports.deletePost = (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                // Check for post owner
                if (post.user.toString() !== req.user.id) {
                    return res
                        .status(401)
                        .json({ notauthorized: 'User not authorized' });
                }

                // Delete
                post.remove().then(() => res.json({ success: true }));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
}

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
exports.likePost = (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if (
                    post.likes.filter(like => like.user.toString() === req.user.id)
                        .length > 0
                ) {
                    return res
                        .status(400)
                        .json({ alreadyliked: 'User already liked this post' });
                }
                // Add user id to likes array
                post.likes.unshift({ user: req.user.id });

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
}


// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
exports.unLikePost = (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if (
                    post.likes.filter(like => like.user.toString() === req.user.id).length === 0
                ) {
                    return res
                        .status(400)
                        .json({ notliked: 'You have not yet liked this post' });
                }
                // Get remove index
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);

                // Splice out of array
                post.likes.splice(removeIndex, 1);

                // Save
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
} 