import Botonera from './components/Navbar/Botonera.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import CartContextProvider from './context/CartContext.jsx';
import Cart from './components/Cart/Cart.jsx';
import Contact from './components/Contact/Contact.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <main>
          <header>
            <Botonera />
          </header>
          <Routes>
            <Route exact path="/" element={<ItemListContainer />} />
            <Route exact path="/novedades" element={<ItemListContainer isNovedad={true} />} />
            <Route exact path="/categoria/:categoryID" element={<ItemListContainer isNovedad={false} />} />
            <Route exact path="/producto/:productID" element={<ItemDetailContainer />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/contacto" element={<Contact />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
