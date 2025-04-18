import React from "react";
// import recipe from "../assets/recipe.jpeg"
import { GoHomeFill } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-10 h-[10vh] bg-[#FF5200] flex items-center justify-between px-15">
      <div className="flex items-center justify-center gap-1">
       <div className="w-[50%] ">
       <Link to={"/"}><div className="flex  kalnia text-white items-center justify-center text-4xl ">
          <sub className="font-bold  text-sm">The</sub>
          <h1 className="font-bold ">Recipe</h1>
          <sup className=" text-sm">Finder</sup>
        </div></Link>
       </div>
      </div>
      <div className="flex w-[50%] font-bold text-[16px] text-white items-center justify-center gap-15 ">
       <Link to={"/"} > <h2 className="flex items-center justify-center gap-2"><span><GoHomeFill/></span>Home</h2></Link>
        <Link to={"/favourites"}><h2 className="flex items-center justify-center gap-2">
           <span><FaHeart/></span>
            Favourites</h2></Link>
        <button className="w-[120px] h-[50px] rounded-xl bg-black">Login</button>
      </div>
    </header>
  );
};

export default Header;
