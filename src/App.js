import Botonera from './components/Navbar/Botonera.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <main>
      <header>
        <Botonera />
      </header>
      <ItemListContainer greeting="Bienvenidos a Mil Ventanas" />
    </main>
  );
}

export default App;
