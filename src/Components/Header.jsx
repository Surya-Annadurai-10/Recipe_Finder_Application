import React, { useState } from "react";
// import recipe from "../assets/recipe.jpeg"
import { GoHomeFill } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { MdClear } from "react-icons/md";

const Header = () => {
  const [showOptions , setShowOptions] = useState(false)
  return (
    <header className="w-full sticky top-0 z-10 h-[10vh] bg-[#FF5200] flex items-center justify-between px-1 md:px-15">
      <div className="flex w-[50%]  h-full items-center  justify-start gap-1">
       <div className=" flex items-center gap-2  justify-start ">
      <IoMenu onClick={() => setShowOptions(true)} className="flex md:hidden cursor-pointer hover:bg-[#e5e5e5]  p-2 rounded-full " style={{fontSize:"3.4rem", }}/>
    
     {
      showOptions ?  <div className="flex md:hidden  w-[98.5%] rounded-md top-[100%] bg-black z-[999] absolute font-bold text-[16px] text-white flex-col items-start  justify-center ">
      <MdClear onClick={() => setShowOptions(false)} className="absolute top-2 right-2 text-3xl hover:bg-white hover:text-black rounded-full text-white"/>
     <Link onClick={() => setShowOptions(false)} className="hover:bg-[#ff51005d] w-full " to={"/"} > <h2 className="flex py-5 px-3  items-center justify-center gap-2"><span><GoHomeFill/></span>Home</h2></Link>
      <Link onClick={() => setShowOptions(false)} className="hover:bg-[#ff51005d] w-full" to={"/favourites"}><h2 className="flex py-5 px-3  items-center justify-center gap-2">
         <span><FaHeart/></span>
          Favourites</h2></Link>
    
    </div> : null
     }

       <Link to={"/"}><div className="flex  kalnia text-white items-center justify-center text-2xl md:text-4xl ">
          <sub className="font-bold  text-sm">The</sub>
          <h1 className="font-bold ">Recipe</h1>
          <sup className=" text-sm">Finder</sup>
        </div></Link>
       </div>
      </div>
      <div className="flex w-[50%]  font-bold text-[16px] text-white items-center justify-center gap-15 ">
       <Link to={"/"} > <h2 className="md:flex hidden items-center justify-center gap-2"><span><GoHomeFill/></span>Home</h2></Link>
        <Link to={"/favourites"}><h2 className="md:flex hidden items-center justify-center gap-2">
           <span><FaHeart/></span>
            Favourites</h2></Link>
        <button className="lg:w-[120px] w-[130px] h-[40px] md:h-[45px] rounded-xl bg-black">Login</button>
      </div>
    </header>
  );
};

export default Header;
