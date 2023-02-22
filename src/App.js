import './App.css';
import { Routes, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Cart from './components/Cart';
import { useEffect } from 'react';
import Register from './components/Register';
import Main from './components/Main';

function App() {
  useEffect(() => {
    const storage = sessionStorage.getItem('watched');
    
    if (!storage) {
      sessionStorage.setItem('watched', JSON.stringify([]))
    }
  })

  return (
    <div className="App">
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Main />} />
          <Route path='/detail/:id' element={<Detail />}/>
          <Route path='/cart' element={<Cart />} />
        </Routes>
    </div>
  );
}

export default App;
