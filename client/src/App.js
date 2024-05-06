import {Routes,Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Account from './pages/Account';
import Footer from './components/Footer';

import back_Image from './assests/rocket.jpg'
import About from './pages/About';
import NaturalDisaters from './pages/NaturalDisaters';
import Image_of_the_day from './pages/Image_of_the_day';
import Asteriod from './pages/Asteriod';


function App() {

  const isUserSignedIn = !!localStorage.getItem('token');

  return (
    <div className="App" style={{
      backgroundImage: `url(${back_Image})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
        {isUserSignedIn && <Route path='/account' element={<Account/>}/>}
        {isUserSignedIn && <Route path='/about' element={<About/>}/>}
        {isUserSignedIn && <Route path='/natural-disaster' element={<NaturalDisaters/>}/>}
        {isUserSignedIn && <Route path='/image-of-the-day' element={<Image_of_the_day/>}/>}
        {isUserSignedIn && <Route path='/asteriod' element={<Asteriod/>}/>}

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
