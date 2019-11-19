const express = require('express');
const router = express.Router();

const authServices = require('../middlewares/auth');

const blogCtrl = require('../controllers/blog');

const { checkRole, checkScopes, jwtCheck } = authServices;

router.get('', blogCtrl.getBlogs);

router.get('/me', jwtCheck, checkScopes, checkRole('siteOwner'), blogCtrl.getUserBlogs);

router.post('', jwtCheck, checkScopes, checkRole('siteOwner'), blogCtrl.createBlog);

router.get('/:id', jwtCheck, checkScopes, checkRole('siteOwner'), blogCtrl.getBlogById);

router.get('/s/:slug', blogCtrl.getBlogBySlug);

router.patch('/:id', jwtCheck, checkScopes, checkRole('siteOwner'), blogCtrl.updateBlog);

router.delete('/:id', jwtCheck, checkScopes, checkRole('siteOwner'), blogCtrl.deleteBlog);

module.exports = router;