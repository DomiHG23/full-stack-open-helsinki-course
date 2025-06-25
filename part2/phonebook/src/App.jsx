import { useState } from "react";

const App = () => {
    // const [persons, setPersons] = useState([]);
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const addPerson = (event) => {
        // para evitar que el formulario realice su acción predeterminada al enviarse, que normalmente es recargar la página
        event.preventDefault();

        console.log("button clicked", newName);
        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook as name`);
            return;
        }

        if (persons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already added to phonebook as phone number`);
            return;
        }

        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };

        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const personsToShow = (filter === "")
        ? persons
        : persons.filter(person => 
            person.name.toLowerCase().includes(filter.toLowerCase())
        );

    return (
        <div>
            <h2>Phonebook</h2>
            <p>Filter shown with </p>
            <input
                value={filter}
                onChange={handleFilterChange}
            />
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map((person) => (
                    <li key={person.id}>
                        {person.name}: {person.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
