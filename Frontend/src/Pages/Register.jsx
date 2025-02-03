
import Header from "../Components/Header";
import BG_Image from "../Components/BG_Image";
import googleicon from "../assets/Google-icon.svg";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Footer from "../Components/Footer";

function Register(){
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [isSubmitted, setSubmitted] = useState(false);


    function handleGoogleSignUp () {
      window.location.href = "http://localhost:3000/auth/google"; 
    };

  function validateFields () {
    let fieldErrors = { email: '', password: '', confirmPassword: '' };
    let isValid = true;

    // Email validation
    if (!email) {
      fieldErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      fieldErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      fieldErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      fieldErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      fieldErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }
    
    console.log('Validation result:', isValid);
    console.log('Errors:', fieldErrors);
    setErrors(fieldErrors);
    return isValid;
  };

  async function handleSubmit(e) {
    console.log('submit press')
    e.preventDefault();


    if (!validateFields()) {
      return;
    }
  console.log('continued');
    setSubmitted(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/register',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json', // Ensure the Content-Type is set to JSON
          },
         withCredentials: true // Make sure you're sending cookies if needed
        }
      );
      console.log('Response:', response);
      if(response.status == 201){
      toast.success('Successful Registration.');
      navigate('/Portfolio')
      }
       else if(response.status == 500){
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitted(false);
    }

    
  }
    return(
    <div>
      <Header/>
     <BG_Image>
     <div className={`bg-black bg-opacity-100 p-10 w-full h-full sm:w-[500px] sm:bg-opacity-50 sm:h-screen`}
>
         <h1 className="font-bold text-white text-3xl px-12">Create a new account</h1>

         <form onSubmit={handleSubmit} className="space-y-5 pt-5 px-12">
           
          <div >
            <input type="email" placeholder="Email" className="w-full h-16 bg-transparent border-2 border-white
             placeholder-gray-400 text-white rounded-md px-4 py-2 text-2xl
            focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
            name="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

          </div>
         
          <div>
            <input type="password" placeholder="Password" className="w-full h-16 bg-transparent border-2 border-white
            placeholder-gray-400 text-white rounded-md px-4 py-2 text-2xl
           focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
           name="password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           />
           
          </div>

          
          <div>
            <input type="password" placeholder="Confirm Password" className="w-full h-16 bg-transparent border-2 border-white
            placeholder-gray-400 text-white rounded-md px-4 py-2 text-2xl
           focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
           value={confirmPassword}
           onChange={(e)=> setConfirmPassword(e.target.value)}
           />
           
          </div>

          <div>
            <button type="submit" disabled={isSubmitted} className="w-full h-14 bg-green-600 text-white font-semibold text-xl rounded-md hover:bg-green-700 ">Sign Up</button>
          </div>
          <div>
         {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>

         </form>
         
         <div className="flex items-center justify-center my-8 px-10">
          <div className="w-full h-px bg-gray-600"></div>
          <span className="px-2 text-gray-400">OR</span>
          <div className="w-full h-px bg-gray-600"></div>
        </div>
        
        <div className="flex items-center bg-white mx-12 w-4/5 rounded-full">
        <button className="h-14 flex items-center justify-center " onClick={handleGoogleSignUp}>
          <img className="h-8 px-3" src={googleicon} alt="google" />
          <span className="text-black font-semibold text-xl px-8">Sign in with Google</span>
        </button>
        </div>

        </div>
     </BG_Image>
     <Footer/>
    </div>
   
    );
}

export default Register;