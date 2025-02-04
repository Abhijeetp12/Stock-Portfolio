import { useState } from 'react'
import Header from '../Components/Header';
import BG_Image from '../Components/BG_Image';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import googleicon from "../assets/Google-icon.svg";

function Login() {

 

  function handleGoogleSignIn () {
    window.location.href = "http://localhost:3000/auth/google"; 
  };

  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [errorMessage,setErrorMessage]=useState('');

  async function handleSubmit(e){
    e.preventDefault();
    try {
      if (!email || !password) {
        setErrorMessage('Please fill in all fields.');
        return;
      }
      
      const response = await axios.post(
        'http://localhost:3000/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json', // Ensure the Content-Type is set to JSON
          },
         withCredentials: true // Make sure you're sending cookies if needed
        }
      );
      if (response.status === 200) {
        toast.success("Login successful.");
        // Check authentication status
        const authResponse = await axios.get("http://localhost:3000/checkauth", {
            withCredentials: true,
        });
        if (authResponse.data.isAuthenticated) {
            navigate("/Portfolio");
        }
    } else {
        toast.error("Login unsuccessful");
        setErrorMessage(response.data.message);
    }
    } catch (error) {
      if (error.response) {
        toast.error( 'Login unsuccessful.');
        setErrorMessage(error.response.data.message || 'An error occurred.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from the server. Please try again.');
      } else {
        console.error('Error:', error.message);
        toast.error('Something went wrong. Please try again.');
      }
  }
  }
  return (
    <div>
      <Header/>
      <BG_Image>
      <div className="bg-black bg-opacity-100 p-10 w-full h-full sm:w-[500px] sm:bg-opacity-50 sm:h-4/5">
         <h1 className="font-bold text-white text-3xl px-12">Login</h1>

         <form onSubmit={handleSubmit} className="space-y-5 pt-5 px-12">  
          <div >
            <input type="email" placeholder="Email" className="w-full h-16 bg-transparent border-2 border-white
             placeholder-gray-400 text-white rounded-md px-4 py-2 text-2xl
            focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
          <input type="password" placeholder="Password" className="w-full h-16 bg-transparent border-2 border-white
          placeholder-gray-400 text-white rounded-md px-4 py-2 text-2xl
         focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
         name='password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         />
          </div>

          <div>
            <button type='submit' className="w-full h-14 bg-green-600 text-white font-semibold text-xl rounded-md hover:bg-green-700 ">Login</button>
          </div>
        
          {errorMessage && <p className='px-0' style={{ color: 'red' }}>{errorMessage}</p>}
         </form>
        

         <div className="flex items-center justify-center my-8 px-10">
            <div className="w-full h-px bg-gray-600"></div>
            <span className="px-2 text-gray-400">OR</span>
            <div className="w-full h-px bg-gray-600"></div>
          </div>
                  
        <div className="flex items-center bg-white mx-12 w-4/5 rounded-full">
       <button className="h-14 flex items-center justify-center " onClick={handleGoogleSignIn}>
         <img className="h-8 px-3" src={googleicon} alt="google" />
          <span className="text-black font-semibold text-xl px-8">Continue with Google</span>
            </button>
          </div>


         <div className="flex items-center justify-between my-8 px-10">
          <div className="text-white px-3 text-lg">
          Don't have an account?
          </div>
          <div  >
            <Link to="/Register"><p className="text-blue-700 underline underline-offset-4 px-2 hover:cursor-pointer text-lg">Sign up</p>
            </Link>
          </div>
        </div>
        
       </div>
        
      </BG_Image>
      <Footer/>
     
    </div>
  
  );
 }


export default Login;
