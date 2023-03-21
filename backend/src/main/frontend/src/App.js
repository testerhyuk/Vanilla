import './App.css';
import { Routes, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Cart from './components/Cart';
import { useEffect } from 'react';
import Register from './components/Register';
import Main from './components/Main';
import RegisterEmail from './components/RegisterEmail';
import Login from './components/Login';
import Category from './components/Category';

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
          <Route path='/' element={<Main />} />
          <Route path='/detail/:id' element={<Detail />}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register/email' element={<RegisterEmail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/category/:sex/:cat' element={<Category />} />
        </Routes>
    </div>
  );
}

export default App;
