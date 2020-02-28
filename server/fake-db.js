const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const Payment = require('./models/payment');

const fakeDbData = require('./data.json')

class FakeDb{
    constructor(){
        this.rentals = fakeDbData.rentals;

        this.user = fakeDbData.users;
    }

    async cleanDb(){
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
        await Payment.remove({});
    }

    pushDataToDb(){
        const user = new User(this.user[0]);
        const user2 = new User(this.user[1]);
        
        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);
            newRental.save();
        });
        user.save();
        user2.save();
    }

    async seedDb(){
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;

