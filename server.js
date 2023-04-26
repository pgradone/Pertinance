if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const docRouter = require('./routes/docs');
const kwdRouter = require('./routes/kwds');
const fldRouter = require('./routes/flds');
const mapRouter = require('./routes/maps');
const candidateRouter = require('./routes/candidates');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/docs', docRouter);
app.use('/flds', fldRouter);
app.use('/kwds', kwdRouter);
app.use('/maps', mapRouter);
app.use('/candidates', candidateRouter);

// fill the candidates table here
// const Candidate = require('./models/candidate');

// async function seedDatabase() {
//   // Check if the collection is already populated
//   const count = await Candidate.countDocuments();
//   if (count > 0) return;

//   // If the collection is empty, fetch the data and save it to the database
//   const candidatesData = await Candidate.candidateData;
//   console.log(candidatesData);
//   await Candidate.create(candidatesData);
// }

// seedDatabase()
//   .then(() => {
//     console.log('Database seeded successfully');
//   })
//   .catch((err) => {
//     console.error('Error seeding database:', err);
//   });

app.listen(process.env.PORT || 3000);
