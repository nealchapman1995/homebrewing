const express = require('express')
const app = express()
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const port = 80
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipes');
require('dotenv').config()

const uri = process.env.ATLAS_URI;


mongoose.connect(uri, {
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

app.use(require('express-session')({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false
}))

const { ExpressOIDC } = require('@okta/oidc-middleware')
const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile'
})

app.use(oidc.router)

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/register', (req, res) => {
	res.render('register');
})

app.get('/recipes', async(req, res, next) => {
	try{
		const recipes = await Recipe.find({});
		res.render('recipes', {recipes})
	}
	catch{
		res.render("404error");
	}
})

app.get('/new', (req, res) => {
	res.render('new')
})

app.get('/calculations', (req, res) => {
	res.render('calculations')
})

app.post('/new', async(req, res, next) => {
	const recipe = new Recipe(req.body.recipe);
	try{
		await recipe.save();
		res.redirect(`/recipes/${recipe._id}`);
	}
	catch(e){
		res.render('error', { e });
	}
})

app.get('/recipes/:id', async (req, res, next) => {
	try{
		const recipes = await Recipe.findById(req.params.id);
		res.render('show', { recipes })
	}
	catch(e){
		res.render("404error");
	}
})

app.get('/recipes/:id/edit', async (req, res) => {
	try{
		const recipe = await Recipe.findById(req.params.id);
		res.render('edit', { recipe })
	}
	catch{
		res.render("404error");
	}
})

app.put('/recipes/:id', async (req, res, next) => {
	const {id} = req.params;
	try{
		const recipe = await Recipe.findByIdAndUpdate(id, {...req.body.recipe});
		res.redirect(`/recipes/${recipe._id}`);
	}
	catch(e){
		res.render('error', { e });
	}
})

app.delete('/recipes/:id', async (req, res) => {
	const { id } = req.params;
	await Recipe.findByIdAndDelete(id);
	res.redirect('/recipes');
})

app.use((req, res, next) => {
	res.render("404error");
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})