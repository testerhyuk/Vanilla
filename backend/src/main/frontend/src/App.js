import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Detail from './components/product/Detail';
import Cart from './components/cart/Cart';
import { useEffect } from 'react';
import Register from './components/auth/Register';
import Main from './components/mainpage/Main';
import RegisterEmail from './components/auth/RegisterEmail';
import Login from './components/auth/Login';
import Category from './components/product/Category';
import SearchPage from './components/product/SearchPage';
import Nav from './components/mainpage/Nav';
import Footer from './components/mainpage/Footer';
import RecentWatched from './components/recent/RecentWatched';
import MyPage from './components/mypage/MyPage';

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
            <Route path='my-page' element={<MyPage />} />
          </Route>
          <Route path='register' element={<Register />} />
          <Route path='register/email' element={<RegisterEmail />} />
          <Route path='login' element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
