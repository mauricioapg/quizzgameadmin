import Footer from 'components/Footer';
import CategoryProvider from 'contexts/Categories';
import UserProvider from 'contexts/Users';
import Categories from 'pages/Categories';
import Levels from 'pages/Levels';
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Questions from './pages/Questions';

function AppRoutes() {

  return (
    <BrowserRouter>

      <Header />
      <UserProvider>
        <CategoryProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/questions' element={<Questions />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/levels' element={<Levels />} />
          </Routes>
        </CategoryProvider>
      </UserProvider>

      <Footer />

    </BrowserRouter>
  );
}

export default AppRoutes;
