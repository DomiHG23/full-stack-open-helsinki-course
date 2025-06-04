import ReactDOM from 'react-dom/client'

import App from './App'

// renderizar el contenido del componente "App" dentro del elemento div, definido en el archivo index.html, que tiene el valor 'root' en el atributo id.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)