const express = require('express');
const router = express.Router();
const controller = require('../controllers')
/*filemetadata route dependencies for file upload*/
const multer = require('multer');
const upload = multer({ dest: './uploads/'});


//get all recipeposts
router.get('/recipeposts', controller.recipepost.getPosts);

//get recipepost by id
router.get('/recipeposts/:id', controller.recipepost.getPosts);

//post create new recipe
router.post('/recipeposts', upload.single('recipe_gif'), controller.recipepost.createPost);

//post register new user
router.post('/register', controller.user.register);

// //get all users
// router.get('/users', controller.user.getUsers);
// //get user by id
// router.get('/users/:id', controller.user.getUsers);










module.exports = router;
