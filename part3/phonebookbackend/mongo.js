const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://dluz:${password}@cluster0.stlvnem.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model("Person", personSchema);

mongoose.connect(url).then((result) => {
  console.log("connected");

  if (process.argv.length < 4) {
    Person.find({})
      .then((result) => {
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });

        mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  } else {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
      date: new Date(),
    });

    person
      .save()
      .then(() => {
        console.log(
          `added ${person.name} number ${person.number} to phonebook`
        );
        return mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  }
});
