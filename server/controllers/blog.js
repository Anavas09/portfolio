const Blog = require("../models/blog");
const slugify = require('slugify');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

exports.getBlogs = (req, res) => {

  Blog.find({status: 'published'})
    .sort({'updatedAt': -1})
    .exec((err, publishedBlogs) => {
      if (err){
        return res.status(422).send(err)
      }

        return res.json(publishedBlogs)
    })
}

exports.getBlogBySlug = (req, res) => {
  const slug = req.params.slug;

  Blog.findOne({slug}, function(err, foundBlog) {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(foundBlog);
  });
};

exports.getUserBlogs = (req, res) => {
  const userId = req.user && req.user.sub;

  Blog.find({userId}, function(err, userBlogs) {

    if (err) {
      console.error(err.message);
      return res.status(422).send(err.message);
    }
    
    return res.json(userBlogs);
  })
}

exports.createBlog = (req, res) => {
  const lockId = req.query.lockId;

  if (!lock.isBusy(lockId)){
    lock.acquire(lockId, function(done) {
      // async work

      const namespace = 'http://localhost:3000';
      const blogData = req.body;
    
      const userId = req.user && req.user.sub;
      const author = req.user && req.user[`${namespace}/user`];
    
      const blog = new Blog(blogData);
      blog.userId = userId;
      blog.author = author;
      console.info("blog with userId and author");
      console.info(blog);
    
      blog.save((err, createdBlog) => {
        setTimeout(() => done(), 5000);

        if (err) {
          console.error(err.message);
          return res.status(422).send(err.message);
        }
    
        return res.json(createdBlog);
      });
    }, function(err, ret) {
        err && console.error(err)
    });
  } else {
    return res.status(422).send({message: 'Blog is getting save'});
  }
};

exports.updateBlog = (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  // Portfolio.findByIdAndUpdate(blogId, blogData, {useFindAndModify: true}, (err, updatedPortfolio) => {
  //   if (err){
  //     return res.status(422).send(err)
  //   }

  //   return res.json(updatedPortfolio)
  // })

  Blog.findById(blogId, (err, foundBlog) => {
    if (err){
      return res.status(422).send(err);
    }

    if (blogData.status && blogData.status === 'published' && !foundBlog.slug){
      foundBlog.slug = slugify(foundBlog.title, {
                                  replacement: '-',
                                  remove: null,
                                  lower: true
                                });
    }

    foundBlog.set(blogData);
    foundBlog.updatedAt = new Date();
    foundBlog.save((err, savedBlog) => {
      if (err){
        return res.status(422).send(err);
      }

      return res.json(foundBlog);
    })
  })
}

exports.getBlogById = (req, res) => {
  const blogId = req.params.id;

  Blog.findById(blogId, (err, foundBlog) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(foundBlog);
  });
};

exports.deleteBlog = (req, res) => {
  const blogId = req.params.id;

  Blog.deleteOne({_id: blogId}, (err, deletedBlog) => {
    if (err){
      return res.status(422).send(err)
    }

    return res.json({status: 'BLOG DELETED'})
  })
}