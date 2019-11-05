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


mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(()=> {
    if(process.env.NODE_ENV !== 'production'){
        const fakeDb = new FakeDb();
//        fakeDb.seedDb();
    }
});


app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if(process.env.NODE_ENV === 'production'){
    const appPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(appPath))

    app.get('*', function(req, res){
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

app.listen(PORT, function(){
    console.log('I am running');
});  


