let mongoose = require('mongoose');
const server = '127.0.0.1:27017'; 
require('dotenv').config();
const database = process.env.MONGO_URI;     

//connect mongoose
     mongoose.connect(`mongodb://${server}/${database}`,{ useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })


//create schema
var personSchema = new mongoose.Schema({
    name: { type : String, required: true},
     age : {type:Number},
     favoriteFoods: [String]
   });

//create Model
var personModel = mongoose.model('persons', personSchema);


//Create and Save a Record of a Model
var person=new personModel({ name:"latifa",age:25,favoriteFoods:["spaghetti","pizza"]})
 
person.save(function (err,data) {
    if (err) { throw err; }
    console.log('element is added');
  });

  //Create Many Records with model.create()
var array1 = [
    { name:"oumayma",age:25,favoriteFoods:["carbonara","bianca"]}, 
    { name:"farah",age:40,favoriteFoods:["dorate","Couscous"]},
    { name:"ahmed",age:35,favoriteFoods:["crèpe"]},
    { name:"mouna",age:30}
];

personModel.create(array1,(err,person)=>{
    if (err) { throw err; }
    mongoose.connection.close();
    console.log('table is added')
});

//Model.find() to Search Database
personModel.find({})
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  });

  //model.findOne()
personModel.findOne({})
.then(doc => {
  console.log(doc)
})
.catch(err => {
  console.error(err)
})

//model.findById() 
personModel.findById({
  _id: "5ee7c8666d798940a403a8f2"
})
.then(doc => {
console.log(doc)
})
.catch(err => {
console.error(err)
})

//simple update
personModel.update({  _id: "5ee7c8666d798940a403a8f2"}, {$push:{ favoriteFoods:"hamburger"} }, { multi : true }, function (err,data) {
    if (err) { throw err; }
    console.log("hamburger is added" );
  });
  
  //update by findOneAndUpdate()
  personModel.findOneAndUpdate({  name:"latifa"}, {age:20 },{new: true})
    .then(doc => {
      console.log("l'age of latifa is modified" + doc)
    })
    .catch(err => {
      console.error(err)
    })

    //findByIdAndRemove
personModel.findByIdAndRemove({
    _id: "5ee7c8666d798940a403a8f2"
    })
  .then(response => {
    console.log("element is removed" )
  })
  .catch(err => {
    console.error(err)
  })
  //remove()
  personModel.remove({  age:{$gt:25}}, function (err,data) {
    if (err) { throw err; }
    console.log('persons who have above 25 years old are removed');
  });

//Query Helpers
 personModel.find({favoriteFoods: "crèpe"})
             .sort({name:1})
             .limit(2)
             .select({age:true})
             .exec()
             .then(doc => {
                console.log(doc)
              })
              .catch(err => {
                console.error(err)
              })