
import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/home";
import Login from "./Pages/Login";
import Register from './Pages/Register';
import Portfolio from './Pages/Portfolio';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);

    // Check session on app load
    useEffect(() => {
      async function CheckSession () {
        try {
          const response = await axios.get('/portfolio', {
            
            withCredentials: true, 
          });
  
          if (response.status === 200) {
          
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error('Error checking session:', err);
          setUser(null);
        }
      };
  
      CheckSession();
    }, []);
  

    return (
        <Router>
            <div>
                <Routes>
                  
                    <Route path="/" element={<Home/>}/>
                    <Route path='/Login' element={<Login/>}/>
                    <Route path='/Register' element={<Register/>}/>
                    <Route path='/portfolio' element={<Portfolio/>}/>
                </Routes>
            </div>
            <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick  
        theme="light" 
      />
        </Router>
    );
}

export default App;
