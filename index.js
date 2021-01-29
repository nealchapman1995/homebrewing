const express = require('express')
const app = express()
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const port = 3000
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/recipes');

mongoose.connect('mongodb://localhost:27017/homebrewing', {
	useNewUrlParser: true,
	useCreateIndex:true,
	useUnifiedTopology:true
});

mongoose.connection.on('error', console.log.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
	console.log('Database connected')
});

app.use('/static', express.static(path.join(__dirname, 'public')))
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views')
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/home', (req, res) => {
	res.send('Home Page!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})