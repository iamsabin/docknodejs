import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import Contact from './src/models/crmModel';

const app = express();
const PORT = 4000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/crm', function (err) {
    if (err) throw err;

    console.log('Successfully connected');

    var jamieContact = new Contact({
        firstName: 'Jamie',
        lastName: 'Munro',
        email: 'endyourif@email.com',
        company: 'ASP.NET',
        phone: 1234
    });

    jamieContact.save(function(err) {
        if (err) throw err;

        console.log('Contact successfully saved.');

    });

    Contact.find({}, (err, contact) => {
        if (err) {
           throw err;
        }
        console.log(contact);
    });
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
