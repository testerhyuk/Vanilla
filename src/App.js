import './App.css';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Banner from './components/Banner';
import Product from './components/Product';
import Footer from './components/Footer';
import Cart from './components/Cart';

function App() {

  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path='/' element={<><Banner /> <Product /></>}/>
        <Route path='/detail/:id' element={<Detail />}/>
        <Route path='/cart' element={<Cart />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
