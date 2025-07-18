import { useState } from "react";

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

    const getRandomAnecdote = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * anecdotes.length);
        } while (randomIndex === selected);
        setSelected(randomIndex);
    };

    const handleVotes = () => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);
    };

    return (
        <div>
            <Title text="Anecdote of the day" />
            <div style={{ marginBottom: "8px" }}>{anecdotes[selected]}</div>
            <div style={{ marginBottom: "8px" }}>
                <Votes votes={votes[selected]} />
            </div>

            <div>
                <Button handleClick={getRandomAnecdote} text="Next anecdote" />
                <Button handleClick={handleVotes} text="Vote" />
            </div>

            <Title text="Anecdote with most votes" />
            <div style={{ marginBottom: "8px" }}>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
            <div>
                <Votes votes={Math.max(...votes)} style={{ marginBottom: "8px" }}/>
            </div>
        </div>
    );
};

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Votes = ({ votes }) => {
    return (
        <div>
            <span>This anecdote has {votes} votes</span>
        </div>
    );
};

const Title = ({ text }) => {
    return <h1>{text}</h1>;
};

export default App;
