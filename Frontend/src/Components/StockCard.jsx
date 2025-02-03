

function StockCard({stock,onEditPrice,ondelete}){
  console.log("Recieved stock",stock);
    return(
    <div className="flex flex-col h-[150px] w-4/5 md:w-1/3 justify-between bg-slate-300 gap-3 
    shadow-md hover:scale-105 hover:shadow-lg rounded-md">
      <div className="flex flex-row justify-center  bg-slate-800">
        <p  className="text-white text-xl ">{stock.stock_name}</p> 
      </div>

      <div className="flex flex-row text-black justify-around">
     <p>{stock.ticker}</p>
     <p>Price:{stock.price}</p>
     <p>Quantity:{stock.quantity}</p>
      </div>

      <div className="flex flex-row justify-around">
      <button className="bg-green-600 h-9 w-20 rounded-sm hover:bg-green-700"
      onClick={()=>onEditPrice(stock)}
      >
       Edit
      </button>
      <button className="bg-red-600 h-9 w-20 hover:bg-red-700 mb-2"
      onClick={()=>ondelete(stock)}
      >
      delete
      </button>
      </div>

    </div>
    );
}

export default StockCard;
