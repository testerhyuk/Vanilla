import './App.css';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Banner from './components/Banner';
import Product from './components/Product';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { useEffect } from 'react';
import RecentWatched from './components/RecentWatched';

function App() {
  useEffect(() => {
    const storage = sessionStorage.getItem('watched');

    if (!storage) {
      sessionStorage.setItem('watched', JSON.stringify([]))
    }
  })

  return (
    <div className="App">
      <Nav />
      <RecentWatched />
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
