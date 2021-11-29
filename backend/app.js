// file will contain express app
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// a middleware to confing the CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Thing created successfully!'
    });
  });

app.use('/api/stuff', (rep,res,next) => {
  const stuff = [
    {
        _id: "staff124",
        title: "this the title for the first stuff",
        description: "jjff ffufh uhfufhb ccbdfuydf dfhudhfd",
        imageUrl: "",
        price: 2548,
        userId: "bhhf124",
      },{
        _id: "staff124",
        title: "this the title for the first stuff",
        description: "jjff ffufh uhfufhb ccbdfuydf dfhudhfd",
        imageUrl: "",
        price: 2548,
        userId: "bhhf124",
      }
  ]
  res.status(200).json(stuff);
});



module.exports = app;