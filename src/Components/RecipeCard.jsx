import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { DataContext } from "../App";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const RecipeCard = (props) => {
    const ctx = useContext(DataContext);
    const [isFav , setIsFav] = useState(false);
    
    const handleClick = (id ,e) =>{
  console.log   ( e.stopPropagation())
         console.log(id , "id");

       if(!isFav){
        const find = ctx.recipes.find(ele => ele.id == id);
        console.log(find , "find");
        let obj = [
           ...ctx.favourite,
           find
        ]

        let LS =JSON.parse( localStorage.getItem("favItems"))
        let arr =[]
        if(LS == null){
           arr.push(find);
           localStorage.setItem("favItems" , JSON.stringify(arr))
        }else{
          LS.push(find);
          localStorage.setItem("favItems" , JSON.stringify(LS));
        }
        
        ctx.setFavourite(obj);
       }
         
    }

    const handleDelete = (id) =>{
        // const filtered = ctx.favourite.filter(ele => ele.id != id);
        let LS = JSON.parse( localStorage.getItem("favItems"))
        const lsFiltered = LS.filter(ele => ele.id != id);
        localStorage.setItem("favItems" , JSON.stringify(lsFiltered));
        ctx.setFavourite(lsFiltered)
    }

    const handleItemClick = (id) =>{
        console.log(id , "id");
        
    }

  return (
    <div  className=" rounded-2xl relative h-[360px] w-[334px] shadow-[1px_1px_10px_grey]">
      <Link to={`/recipeinfo/${props.id}`} className="relative w-full">
        <div className="w-full absolute top-0 left-0 bottom-0 h-full linear"></div>
        <img className="w-full rounded-2xl" src={props.image || "https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI=" } alt="" />
      </Link>
      <div className="flex flex-col justify-between w-full items-start px-3 py-2">
        <Link  to={`/recipeinfo/${props.id}`}  className="line-clamp-2 font-bold h-[50%] text-xl w-[100%]">{props.title}</Link>
        {
            props.del ? 
            <div onClick={() => handleDelete(props.id)} className="w-[94%] absolute bottom-3 h-[40px] bg-[#FF5200] text-white font-bold grid place-items-center cursor-pointer rounded-md hover:bg-[#FF9500]" >
                <h1>Remove from Favourites</h1>
            </div>
            : 
            <button onClick={(e) => {
              e.stopPropagation();
              setIsFav(true)
                handleClick (props.id , e)
            }} className="w-[94%] absolute bottom-3 h-[40px] bg-[#FF5200] text-white font-bold grid place-items-center cursor-pointer rounded-md hover:bg-[#FF9500]" >
              <h1>{
                isFav ? 
                <span className="flex items-center justify-center gap-2">
                    Added <span className="bg-white grid relative place-items-center rounded-full"><FaCheckCircle style={{color:"green" , fontSize:"1.2rem"}}/></span>
                </span>
                : "Add to Favourites"}</h1>
            </button>
        }
      </div>
    </div>
  );
};

export default RecipeCard;
