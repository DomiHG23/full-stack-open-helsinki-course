import { useState } from "react";

const App = () => {
    // good, neutral y bad son los estados que almacenan el número de clics
    // setGood, setNeutral y setBad son las funciones que se utilizan para actualizar el estado
    // useState es un hook de React que permite añadir estado a un componente funcional
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return <div>
        <h1>give feedback</h1>

        {/* handleClick es el controlador de eventos (que indica lo que debe realizarse al producirse el evento), el cual se activa dentro del componente Button al hacer click, mediante el evento onClick del button del componente Button */}
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>;
};

const Button = ({ handleClick, text }) => {
    // Componente Button que recibe una función para manejar el clic y el texto del botón
    return <button onClick={handleClick}>{text}</button>;
}

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = (good - bad) / total || 0;
    const positive = (good / total) * 100 || 0;

    // if (total === 0) {
    //     return <p>No feedback given</p>;
    // }

    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={total} />
                    <StatisticLine text="average" value={average.toFixed(2)} />
                    <StatisticLine text="positive" value={`${positive.toFixed(2)} %`} />
                </tbody>
            </table>
        </div>
    );
};

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

export default App;
