import React, { useContext } from "react";
import { GoSearch } from "react-icons/go";
import { DataContext } from "../App";
import RecipeCard from "../Components/RecipeCard";

const Favourites = () => {
    const ctx = useContext(DataContext);
  return (
    <section className="w-full h-[90vh] ">
      
      {
        ctx.favourite.length > 0 ? <>
        <div className="flex border m-auto my-5 border-[grey]  bg-white rounded-xl h-[60px] w-[70%] items-center justify-center">
        <input
          className="w-[90%]  text-xl font-bold  outline-none px-4  "
          type="text"
          placeholder="Search favourites..."
        />
        <button className="hover:bg-[#e9e9e9] w-[50px] cursor-pointer grid place-items-center rounded-full h-[50px]">
          <GoSearch style={{ fontSize: " 1.7rem" }} />
        </button>
      </div>
        <div className="flex items-center   px-10 justify-start gap-10 flex-wrap"> 
        {
            ctx.favourite.map((ele , i) =>{
                return <RecipeCard key={`${ele.id}_${i}`} {...ele} del={true}/>
            })
        }
      </div>
        </> : <div className="w-full h-[90vh] grid place-items-center"><h1 className="font-bold text-3xl">No Data...</h1></div>
      }
    </section>
  );
};

export default Favourites;
