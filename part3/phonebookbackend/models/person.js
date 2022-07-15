const mongoose = require("mongoose");

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { 
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return ((/\d{3}-\d+/g).test(v) || (/\d{2}-\d+/g).test(v))
      }
    }
  },
  date: Date,
});

// Editing the way in which documents gets shown in the request api/notes
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // _id property is in fact an object, that is why we use this
    delete returnedObject._id;
    delete returnedObject.__v; //mongo versioning field
  },
});

module.exports = mongoose.model('Person', personSchema);
