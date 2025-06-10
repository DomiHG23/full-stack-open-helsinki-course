// ➡️code: componente

// Esto es un componente llamado "App"
// Técnicamente, el componente se define como una función de JavaScript
// Debe comenzar con mayúscula, de lo contrario React no lo reconocerá como un componente y lo tratará como un elemento HTML nativo.


// const App = () => {
//     // console.log("Hello from component");
//     // return (
//     //     <div>
//     //         <p>Hello world</p>
//     //     </div>
//     // );

//     // Cualquier código de JavaScript entre llaves es evaluado y el resultado de esta evaluación se incrusta en el lugar definido en el HTML producido por el componente.
//     const now = new Date();

//     const a = 10;
//     const b = 20;
//     const name = "Peter";
//     const age = 10;
    
//     console.log(now, a + b);

//     return (
//         <div>
//             <p>Hello world, it is {now.toString()}</p>
//             <Hello name="Maya" age={26 + 10} />
//             <Hello name={name} age={age} />
//             <p>
//                 {a} plus {b} is {a + b}
//             </p>
//         </div>
//     );
// };
// Parece que los componentes de React están devolviendo marcado HTML. Sin embargo, éste no es el caso. El diseño de los componentes de React se escribe principalmente usando JSX.
// //Aunque JSX se parece a HTML, en realidad es una forma de escribir JavaScript. El JSX devuelto por los componentes de React se compila en JavaScript. Se compila con Babel.
// JSX se parece mucho a HTML con la distinción de que con JSX puede incrustar fácilmente contenido dinámico escribiendo JavaScript entre llaves


const Hello = (props) => {
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    );
};

//-------------------------------------------------------------------------------------
// ➡️code: componente

// En React, las cosas individuales a ser renderizadas dentro de llaves deben ser valores primitivos, como números o strings.
// También se pueden renderizar arreglos si el arreglo contiene valores que son elegibles para renderizar (como números y cadenas)
    // const friends = [ 'Peter', 'Maya']

const App = () => {
    const friends = [
        { name: "Peter", age: 4 },
        { name: "Maya", age: 10 },
    ];

    return (
        <div>
            <p>
                {/*Esto no se puede renderizar, es un objeto: <p>{friends[0]}</p> */}
                {friends[0].name} {friends[0].age}
            </p>
            <p>
                {friends[1].name} {friends[1].age}
            </p>
        </div>
    );
};

//-------------------------------------------------

// El componente "App" se exporta para que pueda ser utilizado en otros archivos, como el archivo main.jsx
export default App;
