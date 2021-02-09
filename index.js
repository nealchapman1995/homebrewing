const express = require('express')
const app = express()
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const port = 80
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipes');


mongoose.connect('mongodb+srv://First-User:juneau2denver@cluster0.nkkwh.mongodb.net/recipes?retryWrites=true&w=majority', {
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
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/recipes', async(req, res, next) => {
	const recipes = await Recipe.find({});
	res.render('recipes', {recipes})
})

app.get('/new', (req, res) => {
	res.render('new')
})

app.get('/calculations', (req, res) => {
	res.render('calculations')
})

app.post('/new', async(req, res) => {
	const recipe = new Recipe(req.body.recipe);
	await recipe.save();
	res.redirect(`/recipes/${recipe._id}`);
})

app.get('/recipes/:id', async (req, res, next) => {
	const recipes = await Recipe.findById(req.params.id);
	res.render('show', { recipes })
})

app.get('/recipes/:id/edit', async (req, res) => {
	const recipe = await Recipe.findById(req.params.id);
	res.render('edit', { recipe })
})

app.put('/recipes/:id', async (req, res) => {
	const {id} = req.params;
	const recipe = await Recipe.findByIdAndUpdate(id, {...req.body.recipe});
	res.redirect(`/recipes/${recipe._id}`);
})

app.delete('/recipes/:id', async (req, res) => {
	const { id } = req.params;
	await Recipe.findByIdAndDelete(id);
	res.redirect('/recipes');
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})