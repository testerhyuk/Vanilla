import './App.css';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Banner from './components/Banner';
import Product from './components/Product';

function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path='/' element={<><Banner /> <Product /></>}/>
        <Route path='/detail' element={<Detail />}/>
      </Routes>
    </div>
  );
}

export default App;
