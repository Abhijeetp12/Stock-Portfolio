import { useEffect, useState } from "react";
import Header from "../Components/Header";
import StockCard from "../Components/StockCard";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { useRef } from 'react';



function Portfolio(){

    const [stocks,setStocks]=useState([]);
    const [StockName, setStockName] = useState("");
    const [error,setError]=useState('');
    const [editStock,setEditStock]=useState(null);
    const [editPrice,setPrice]=useState('');
    const navigate=useNavigate();

    const isFetched = useRef(false);

    useEffect( () =>{
    async function fetchPortfolio(){
      if (isFetched.current) return; // Prevent duplicate fetch
      isFetched.current = true;
      console.log(editStock);
        try{
           const response = await axios.get(
        'http://localhost:3000/portfolio', 
        { withCredentials: true }
      );
            if(response.status === 200){
                const data = response.data;
                console.log(data.stocks);
                setStocks(data.stocks);
                toast.success('Welcome! Portfolio loaded successfully.');

            } else if(response.status == 401){
                toast.error('Session expired. Please log in again.');
                navigate('/login');

            } else {
                throw new Error('Failed to fetch portfolio');
            }

        }
    
        catch(err){
        toast.error('Error fetching portfolio. Please try again.');
          console.log(err);
          setError('An error occured please try agin');
        }
    }
    fetchPortfolio();
    },[navigate]);

  function handleEditPrice(stock){
    setEditStock(stock);
    setPrice(stock.price);
   
  }

  async function handleDelete(stock){
    const stockId=stock.id;
    try {
      const response = await axios.delete(`http://localhost:3000/portfolio/delete/stock/${stockId}`);
      if (response.status === 200) {
        toast.success("Stock deleted successfully!");
        // Remove the deleted stock from the state
        setStocks((prevStocks) =>
          prevStocks.filter((stock) => stock.id !== stockId)
        );
      } else {
        throw new Error("Failed to delete stock");
      }
    } catch (err) {
      toast.error("Error deleting stock. Please try again.");
      console.log(err);
    }
  };

  async function handleSavePrice() {
    try {
        console.log(editPrice);
        console.log(editStock.id);
        
        const response = await axios.put(
          `http://localhost:3000/portfolio/update/stock/${editStock.id}`,
          { id:editStock.user_id , price: editPrice }, // Request body
          
        );
        if (response.status === 200) {
            toast.success("Price updated successfully!");
            const updatedStock = response.data;
            console.log(updatedStock.id,'updated');
            console.log(updatedStock.price,'updated');
            // Update the state
            setStocks((prevStocks) =>
              prevStocks.map((stock) =>
                stock.id === updatedStock.id
                  ? { ...stock, price: updatedStock.price } // Update only the price
                  : stock
              )
            );
          console.log(stocks);
            setEditStock(null);
        }  
        
        else {
            throw new Error("Failed to update price");
          }
  }
    catch(err){
        toast.error("Error updating price. Please try again.");
        console.log(err);
    }
 }
 async function handleAddStock(){
  
  try {
    const response = await axios.post(
      "http://localhost:3000/portfolio/stock",
      { StockName},
      { withCredentials: true }
    );

    if (response.status === 201) {
      console.log(response.data.stock);
      const addedStock = response.data.stock;
      setStocks((prevStocks) => [...prevStocks, { ...addedStock }]); // Add new stock to the state
      toast.success("Stock added successfully!");
      setStockName("");
    }
     else if(response.status === 200){
      toast.error("Stock Limit Reached");
     }
     
     else {
      throw new Error("Failed to add stock.");
    }
   

  } catch (err) {
    if (err.response && err.response.status === 404) {
      toast.error(err.response.data.message); 
    } 
    else if(err.response.status === 403 ){
      toast.error("Stock Limit reached");
     }
     else if(err.response.status === 409){
      toast.error("Stock already added");
     }
    else {
      toast.error("Error adding stock. Please try again.");
    }
  }
 }

 function handleCancelEdit(){
  setEditStock(null);
 }
  return (
    <div>
         <Header/>
        
         <div className="w-full h-full sm:h-screen flex flex-col justify-center items-center px-10 bg-slate-950 py-10">
          
            {editStock ? (
                <div className="flex flex-col h-[150px] w-3/4 md:w-1/3 mt-10 justify-between bg-slate-300 gap-3 
                shadow-md hover:scale-105 hover:shadow-lg rounded-md">
                  <div className="flex flex-row justify-center  bg-slate-800">
                    <p  className="text-white text-xl ">Stock Name</p> 
                  </div>
            
                  <div className="flex flex-row text-black justify-around">
                 <p>{editStock.ticker}</p>
                 <label>
                Price:
                <input
                type="number"
                value={editPrice}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full mb-4"
                />
               </label>
                 <p>Quantity:{editStock.quantity}</p>
                  </div>
            
                  <div className="flex flex-row justify-around">
                  <button className="bg-green-600 h-7 w-20 rounded-sm hover:bg-green-700 "
                  onClick={handleSavePrice}
                  >
                   Save
                  </button>
                  <button className="bg-red-600 h-7 w-20 rounded-sm hover:bg-red-700 mb-2"
                  onClick={handleCancelEdit}
                  >
                  Cancel
                  </button>
                  </div>
            
                </div>
        ) :( 
          <>
          <div className="w-2/3 h-[100px] flex flex-row bg-slate-400 sm:w-1/3 md:w-1/4 justify-center items-center px-4 rounded-sm ">
            
            <input type="text" className="w-4/5 h-10 rounded-md placeholder:text-gray-400 pl-2
            focus:outline-double focus:ring-2 focus:ring-white focus:border-white
            " placeholder="Enter Stock Name" 
            name="stockname"
            value={StockName}
            onChange={(e) => setStockName(e.target.value)}
            />
        
            <button className="ml-4 h-10 w-2/5 rounded-md bg-sky-500 hover:bg-sky-600 hover:scale-105"
            onClick={handleAddStock}
            >Add</button>
    
            </div>

        <div className="w-full h-2/3 px-10 flex flex-col mt-10 gap-3 py-3">
          {console.log(stocks)}
          {stocks.length > 0 ? (
            <>
              <div className="flex flex-col items-center md:flex-row justify-around gap-3">
                {stocks.slice(0, 3).map((stock) => {
                 console.log("Rendering stock",stock);
                 return <StockCard
                  key={stock.id}
                 stock={stock} 
                 onEditPrice={handleEditPrice} 
                 ondelete={handleDelete} />
                 })}
              </div>
              <div className="flex flex-col items-center md:flex-row justify-evenly gap-3 md:gap-2">
                {stocks.slice(3).map((stock) => (
                  <StockCard key={stock.id} stock={stock} onEditPrice={handleEditPrice} ondelete={handleDelete} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-white text-xl text-center">No stocks available in your portfolio.</p>
          )}
        </div>
        </>
      )}
    </div>
    <Footer/>
  </div> 
  );
}

export default Portfolio;