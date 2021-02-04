const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { update } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Iteration 1 [schema] 

   //Iteration 2
   // function version
  const createRecipe = (n) => {
    return Recipe.create({
      title: data[n].title,
      level: data[n].level,
      ingredients: data[n].ingredients,
      cuisine: data[n].cuisine,
      dishType: data[n].dishType,
      image: data[n].image,
      duration: data[n].duration,
      creator: data[n].creator
    })
  }

  // let createRecipe = Recipe.create({
  //   title: data[0].title,
  //   level: data[0].level,
  //   ingredients: data[0].ingredients,
  //   cuisine: data[0].cuisine,
  //   dishType: data[0].dishType,
  //   image: data[0].image,
  //   duration: data[0].duration,
  //   creator: data[0].creator
  // })

  createRecipe(2).then((result) => {
    console.log(result)
  })
  .catch((err)=> {
    console.log(err, 'something went wrong')
  })

//  Iteration 3

let createSeveral = Recipe.insertMany(data)

createSeveral.then((result) => {
  result.forEach((item) => {
    console.log(item.title)
  })
  })
.catch((err) => {
  console.log('error')
})

//  Iteration 4

let updateRecipe = Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {duration: 100})

updateRecipe.then(() => {
  console.log('successfully updated!')
})
.catch((err) => {
  console.log(err, 'issue occurred')
})

// Iteration 5

let removeRecipe = Recipe.deleteOne({title: 'Carrot Cake'})

removeRecipe.then(() => {
  console.log('Item removed!')
})
.catch((err) => {
  console.log(err, 'Errored out')
})

//Iteration 6

Promise.all([createRecipe, createSeveral, updateRecipe, removeRecipe]).then(() => {
  mongoose.connection.close()
  console.log('connection to db closed')
})
.catch((err) => {
  console.log(err, 'error happened, could not close connection')
})

