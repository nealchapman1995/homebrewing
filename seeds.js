const mongoose = require('mongoose');
const recipe = require('./models/recipes');

mongoose.connect('mongodb+srv://First-User:juneau2denver@cluster0.nkkwh.mongodb.net/recipes?retryWrites=true&w=majority', {
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
            name: 'Blueberry Ale',
            style: 'Fruited Ale',
            ABV: 5,
            recipe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac leo non tellus facilisis semper. Donec vitae pretium turpis. Ut at sem sed ex vestibulum luctus. In sodales posuere orci. Donec scelerisque volutpat leo, et venenatis dui pellentesque vel. Aliquam nibh arcu, lacinia sit amet convallis quis, interdum eget massa.",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac leo non tellus facilisis semper. Donec vitae pretium turpis. Ut at sem sed ex vestibulum luctus. In sodales posuere orci. Donec scelerisque volutpat leo, et venenatis dui pellentesque vel. Aliquam nibh arcu, lacinia sit amet convallis quis, interdum eget massa."
        })
        await recipes.save();
    }
}

seedDB().then(() => {
	mongoose.connection.close();
})