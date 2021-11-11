import Botonera from './components/Navbar/Botonera.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <main>
      <header>
        <Botonera />
      </header>
      {/*<ItemListContainer greeting="Novedades" />*/}
      <ItemDetailContainer />
    </main>
  );
}

export default App;
