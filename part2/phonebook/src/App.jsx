import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    // const [persons, setPersons] = useState([
    //     { name: "Arto Hellas", number: "040-123456", id: 1 },
    //     { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    //     { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    //     { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    // ]);
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
            name: String(newName),
            number: String(newNumber),
            id: String(persons.length + 1),
        };

        personService
            .create(personObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
            })
            .catch((error) => {
                console.error("Error creating person:", error);
                alert("Error creating person. Please try again.");
            });
    };

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((p) => p.id !== id));
                    alert(`${name} deleted`);
                })
                .catch((error) => {
                    console.error("Error deleting person:", error);
                    alert("Error deleting person. Please try again.");
                });
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const personsToShow =
        filter === ""
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(filter.toLowerCase())
              );

    const updateNumber = (id, newNumber) => {
        const personToUpdate = persons.find((p) => p.id === id);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personService
            .update(id, updatedPerson)
            .then((returnedPerson) => {
                setPersons(
                    persons.map((person) =>
                        person.id !== id ? person : returnedPerson
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating person:", error);
                alert("Error updating person. Please try again.");
            });
    };

    useEffect(() => {
        personService
            .getAll()
            .then((initialPersons) => {
                setPersons(initialPersons);
            })
            .catch((error) => {
                console.error("Error fetching persons:", error);
            });
    }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez, al montar el componente

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePerson={deletePerson} updateNumber={updateNumber} />
        </div>
    );
};

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            <p>Filter shown with </p>
            <input value={filter} onChange={handleFilterChange} />
        </div>
    );
};

const PersonForm = ({
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
}) => {
    return (
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
    );
};

const Persons = ({ persons, deletePerson, updateNumber }) => {
    return (
        <ul>
            {persons.map((person) => (
                <li key={person.id}>
                    {person.name}: {person.number}
                    <button
                        onClick={() => deletePerson(person.id, person.name)}
                    >
                        delete
                    </button>
                    <button
                        onClick={() => {
                            const result = prompt("Enter new number:", person.number);
                            if (result !== null) {
                                updateNumber(person.id, result);
                            }
                        }}
                    >
                        update number
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default App;
