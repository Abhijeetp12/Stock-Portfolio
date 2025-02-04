import { toast } from "react-toastify";
import icon from "../assets/stocks-icon.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";


function Header(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await axios.get('http://localhost:3000/checkauth', { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated);
            
            } catch (err) {
                console.error("Error checking authentication status:", err);
                setIsAuthenticated(false);
            }
        }
        checkAuth();
    }, [location.pathname]); // Dependency array ensures it runs on route changes
    
  

    async function handleLogOut() {
        try{
            console.log("attempt to logout");
         const response=await axios.post('http://localhost:3000/logout',
            {},{ withCredentials: true } 
        );
        if(response.status === 200){
            toast.success("Logged Out Successfully");
            navigate('/');
        }
        else{
            toast.error("Log out failed");
        }
        } catch(err){
            toast.error("Error logging out. Please try again.");
            console.error(err);
        }
    }

return (
    
    <nav className="w-full h-14 bg-white  flex justify-between space-x-10">
        <div className='flex flex-row ml-10'>
        <img className='h-12 w-8 py-2' src={icon} alt="plane" />
        <p className="font-Anton text-4xl text-black py-1 ml-8">Stock</p>
    </div>
    <div className='mt-2 pr-5'>
            
        {isAuthenticated && location.pathname === "/portfolio" && (
            <button className='bg-black w-20 h-10 rounded-md text-white text-xl font-semibold hover:scale-105'
                onClick={handleLogOut}
            >
                Logout
            </button>
        )
}
</div>

</nav>

);
}

export default Header;
