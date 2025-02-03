import Header from '../Components/Header';
import BG_Image from '../Components/BG_Image'
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

function Home() {


  return (
    <div>
      <Header/>
      <BG_Image>

      <div className="flex flex-col items-center justify-center mx-5">
              <p className="text-white font-bold text-3xl sm:text-4xl md:text-5xl" >Empower your financial future with real-time stock insights and market trends</p>
              <p className="text-green-600 font-semibold text-xl sm:text-2xl md:text-3xl mt-5 underline underline-offset-4">Discover, invest, and grow with confidence</p>
              
          </div>
          <div className="flex flex-row justify-center mt-28">
              <div className="h-12 w-20 bg-transparent border-solid border-white border-2
               text-white font-medium text-2xl mr-10 px-2 py-1 rounded-md cursor-pointer hover:scale-105">
                  <Link to="/Login">login</Link>
              </div>
              <div className="h-12 w-24 bg-green-600 text-white font-medium 
              text-2xl ml-10 pl-1.5 py-1 rounded-md cursor-pointer hover:bg-green-700 hover:scale-105">
              <Link to="/Register">Sign Up</Link>  
              </div>
          </div> 
      </BG_Image>
      <Footer/>
   </div>
  
  );
}

export default Home;
