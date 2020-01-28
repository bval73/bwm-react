const express = require('express'),
      app = express(),
      PORT = process.env.PORT || 3001,
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      config = require('./config'),
      FakeDb = require('./fake-db'),
      Rental = require('./models/rental'),
      path = require('path');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings');
      imageUploadRoutes = require('./routes/image-upload'); 


//mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  mongoose.connect(config.DB_URI).then(() => {
    if(process.env.NODE_ENV !== 'production'){
        const fakeDb = new FakeDb();
//        fakeDb.seedDb();
    }
});


app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1', imageUploadRoutes);

if(process.env.NODE_ENV === 'production') {
//    const appPath = path.join(__dirname, '..', 'dist');  For angular
    const appPath = path.join(__dirname, '..', 'build');
    app.use(express.static(appPath));

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

app.listen(PORT, function(){
    console.log('I am running');
});  


