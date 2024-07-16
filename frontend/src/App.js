import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import SignUp from './components/signup/SignUp';
import Todo from './components/todo/Todo';
import SignIn from './components/signup/SignIn';
import Footer from './components/footer/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { authActions } from './store/index'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (id) {
      dispatch(authActions.logIn());
    }
    return () => {

    }
  })

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' index element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/todo' element={<Todo />} />
          <Route exact path='/signin' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
