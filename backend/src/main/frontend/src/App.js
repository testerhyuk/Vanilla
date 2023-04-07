import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Detail from './components/Detail';
import Cart from './components/Cart';
import { useEffect } from 'react';
import Register from './components/Register';
import Main from './components/Main';
import RegisterEmail from './components/RegisterEmail';
import Login from './components/Login';
import Category from './components/Category';
import SearchPage from './components/SearchPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import RecentWatched from './components/RecentWatched';
import ApiCall from './components/ApiCall';
import Admin from './components/Admin';
import MyPage from './components/MyPage';

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
      <RecentWatched />
    </div>
  )
}

function App() {
  useEffect(() => {
    const storage = sessionStorage.getItem('watched');
    const sessionToken = sessionStorage.getItem('ACCESS_TOKEN');
    const localToken = localStorage.getItem('ACCESS_TOKEN');
    
    if (!storage) {
        sessionStorage.setItem('watched', JSON.stringify([]))
    }

    if (!sessionToken) {
      sessionStorage.setItem('ACCESS_TOKEN', null)
    }

    if (!localToken) {
      localStorage.setItem('ACCESS_TOKEN', null)
    }

  }, [])

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Main />} />
            <Route path='detail/:id' element={<Detail />}/>
            <Route path='cart' element={<Cart />} />
            <Route path='category/:sex/:cat' element={<Category />} />
            <Route path='search' element={<SearchPage />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='register/email' element={<RegisterEmail />} />
          <Route path='login' element={<Login />} />
          <Route path='admin' element={<Admin />} />
          <Route path='my-page' element={<MyPage />} />
        </Routes>
    </div>
  );
}

export default App;
