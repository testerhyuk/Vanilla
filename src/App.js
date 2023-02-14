import './App.css';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Banner from './components/Banner';
import Product from './components/Product';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path='/' element={<><Banner /> <Product /></>}/>
        <Route path='/detail/:id' element={<Detail />}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
