import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logout from './Pages/Logout';
import {ToastContainer} from 'react-toastify';


function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={500} hideProgressBar={true} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
    </Routes>
    </>
    
    
  );
}

export default App;
