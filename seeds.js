const mongoose = require('mongoose');
const recipe = require('./models/recipes');

mongoose.connect('mongodb://localhost:27017/homebrewing', {
	useNewUrlParser: true,
	useCreateIndex:true,
	useUnifiedTopology:true
});

mongoose.connection.on('error', console.log.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
	console.log('Database connected')
});

const seedDB = async () => {
    await recipe.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const recipes = new recipe({
            name: 'lager',
            imgage: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            ABV: 5,
        })
        await recipes.save();
    }
}

seedDB().then(() => {
	mongoose.connection.close();
})