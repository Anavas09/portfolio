const express = require('express');
const next = require('next');
const authServices = require('./middlewares/auth');
const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const config = require('./config');

const Book = require('./models/book')
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const MongoClient = require('mongodb').MongoClient;

const products = [
  {
      "id" : 0,
      "nombre" : "HTML5",
      "precio" : 25,
      "imagen" : "camisa_1",
      "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
  },
  {
      "id" : 2,
      "nombre" : "NodeJS",
      "precio" : 30,
      "imagen" : "camisa_3",
      "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
  }
]

const { checkRole, checkScopes, jwtCheck } = authServices;

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info('Database connected!'))
  .catch((err) => console.error(err))

// const client = new MongoClient(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   console.log('connect')
//   //const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   //client.close();
// });

//async () => ( await mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true } ))()

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post('/api/v1/books', (req, res) => {
    const bookData = req.body;

    console.log(bookData)
    const book = new Book(bookData);

    book.save((err, createdBook) => {
      if (err){
        return res.status(422).send(err)
      }

      return res.json(createdBook)
    })
  })

  server.get('/api/v1/books', (req, res) => {

    Book.find({}, (err, allBooks) => {
      if (err){
        return res.status(422).send(err)
      }

      return res.json(allBooks)
    })
  })

  server.patch('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;
    const bookData = req.body;

    // Book.findByIdAndUpdate(bookId, bookData, {useFindAndModify: true}, (err, updatedBook) => {
    //   if (err){
    //     return res.status(422).send(err)
    //   }

    //   return res.json(updatedBook)
    // })

    Book.findById(bookId, (err, foundBook) => {
      if (err){
        return res.status(422).send(err)
      }

      foundBook.set(bookData)
      foundBook.save((err, savedBook) => {
        if (err){
          return res.status(422).send(err)
        }
  
        return res.json(foundBook)
      })
    })
  })


  server.get('/secretdata', jwtCheck, checkScopes, (req, res) => {
    return res.json(products)
  })

  server.get('/onlysiteowner', jwtCheck, checkScopes, checkRole('siteOwner'), (req, res) => {
    console.log(req.user)
    return res.json(products)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send(
        {
          'title': 'Unauthorized',
          'detail': 'Access denied!'
      });
    }
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`);
  })

  /*createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/b', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })*/
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1);
})