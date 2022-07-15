import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const Filter = ({ text, value, handler }) => (
  <>
    {text}
    <input value={value} onChange={handler} />
  </>
);

const PersonForm = ({ onSubmit, value1, handler1, value2, handler2 }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={value1} onChange={handler1} />
    </div>
    <div>
      number: <input value={value2} onChange={handler2} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
const Persons = ({ filter, list, btnHandler }) => {
  if (filter === "") {
    return list.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <button id={person.id} onClick={btnHandler}>
          delete
        </button>
      </div>
    ));
  } else {
    return list
      .filter((person) => person.name.toLocaleLowerCase().includes(filter))
      .map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button id={person.id} onClick={btnHandler}>
            delete
          </button>
        </div>
      ));
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [message, setMessage] = useState(["", false]);

  const addName = (event) => {
    event.preventDefault();

    let newPerson = persons.find((person) => person.name === newName);
    if (newPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        newPerson = { ...newPerson };
        newPerson.number = newNumber;
        personService
          .update(newPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === newPerson.id ? returnedPerson : person
              )
            );
          })
          .catch((error) => {
            setMessage([
              `Information of ${newPerson.name} has already been removed from server`,
              true,
            ]);
            setTimeout(() => setMessage(["", false]), 5000);
          });
      }
    } else {
      const person = { name: newName, number: newNumber };
      personService.create(person)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        let newMessage = [`Added ${person.name}`, false];
        setMessage(newMessage);
        setTimeout(() => setMessage(["", false]), 5000);
      })
      .catch(error => setMessage([error.response.data, true]))
    }
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleErase = (event) => {
    let id = event.target.id;
    console.log(id);
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === parseInt(id)).name}?`
      )
    ) {
      personService.erase(id);
      setPersons(persons.filter((person) => person.id !== parseInt(id)));
    }
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        text={"filter shown with"}
        value={filterValue}
        handler={handleFilterChange}
      />
      <h2>add a New</h2>
      <PersonForm
        onSubmit={addName}
        value1={newName}
        handler1={handleNameChange}
        value2={newNumber}
        handler2={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={filterValue} list={persons} btnHandler={handleErase} />
    </div>
  );
};

export default App;
