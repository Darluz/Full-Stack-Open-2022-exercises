const { application } = require('express');
const express = require('express');
const app = express();
const { json } = require('express/lib/response');
var morgan = require('morgan');


app.use(express.json());
app.use(morgan('tiny'));
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :body'));

const getRandomInt = (max) => Math.floor(Math.random() * max);

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
})

app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id);
    let person = persons.find(person => person.id === id);

    if(person){
        response.json(person);
    }
    else{
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    let person = persons.find(person => person.id === id);

    if(person){
        persons = persons.filter(person => person.id !== id);
        response.status(204).end();
    }
    else{
        response.status(404).end();
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

  if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
    });
  }
  else if(!body.name){
      return response.status(400).json({
          error: 'name missing'
      });
  }
  else if(!body.number){
    return response.status(400).json({
        error: 'number missing'
    });
  }
  else if(persons.find(person => person.name === body.name)){
    return response.status(400).json({
        error: 'name must be unique'
    });
  }

  const person = {
    id: getRandomInt(10000000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);