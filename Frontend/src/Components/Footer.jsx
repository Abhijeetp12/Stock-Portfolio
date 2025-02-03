import footericon from "../assets/Footer-icon.png";

function Footer(){
return(
<div className="w-full h-28 sm:block hidden">
<footer className="w-full h-full bg-gray-950 px-10 flex flex-col justify-center gap-5 pt-5 ">
   <div className="h-px bg-gray-600 ">

   </div>
   <div className="flex flex-row gap-5">
    <img className="h-7" src={footericon} alt="stockicon"  />
    <p className="text-white"> 2025©Stock,Inc </p>
   </div>
</footer>
</div>
);
}

export default Footer;