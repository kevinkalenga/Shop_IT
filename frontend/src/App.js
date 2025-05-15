import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProductDetails from './components/product/ProductDetails'
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position='top-center' />
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/me/profile' element={<Profile />} />
            <Route path='/me/update_profile' element={<UpdateProfile />} />

          </Routes>

        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
