// file will contain express app

//mongodb+srv://abelMongo:<password>@cluster0.thyhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


const Thing = require('./models/thing');

const app = express();

mongoose.connect('mongodb://abelMongo:B3EbApdwnY3eaN6@cluster0-shard-00-00.thyhm.mongodb.net:27017,cluster0-shard-00-01.thyhm.mongodb.net:27017,cluster0-shard-00-02.thyhm.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4h7o1l-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });




// a middleware to confing the CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

// app.post('/api/stuff', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//       message: 'Thing created successfully!'
//     });
//   });

  app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    thing.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  // get single element
  app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });


  // update elments
  app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


  // delete element
  app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  

  app.use('/api/stuff', (req, res, next) => {
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


 
module.exports = app;