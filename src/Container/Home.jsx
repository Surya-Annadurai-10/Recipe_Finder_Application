import React, { useContext, useState } from "react";
import right from "../assets/right.avif";
import left from "../assets/left.avif";
import middle from "../assets/middle.jpeg";
import food from "../assets/food.webp";
import kfc from "../assets/kfc.webp";
import { PiCookingPotFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import { DataContext } from "../App";
import { FaArrowUp } from "react-icons/fa6";

const Home = () => {
    const {recipes , setRecipes} = useContext (DataContext);
     const [searchBy , setSearchBy] = useState(false)
     const [offset , setOffset] = useState(0)
    
     const [searchVal , setSearchVal] = useState("");

     const recipeFn = async () =>{
        const apiKey = "2e9c02b184c542ca9d95a167c25d9624"
       if(!searchBy){
        const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchVal.toLowerCase()}&number=24&offset=${offset}&apiKey=${apiKey}`)
        setRecipes([
            ...recipes , 
            ...res.data.results
        ])
        console.log(res.data.results);

    }else{
        const val = handleInput(searchVal)
        const res = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${val}&number=24&offset=${offset}&apiKey=${apiKey}`)
        // setRecipes(res.data)
        setRecipes([
            ...recipes , 
            ...res.data
        ])
        console.log(res.data);
        
    }
     }

     const handleShowMore = ()=>{
        setOffset(prev => prev + 24)
        recipeFn()
     }


     const handleInput = (val) =>{
        if(!searchBy){
            setSearchVal(val);
        }else{
            const splittedText = val.split(" ");
            let text = "";
            splittedText.map((ele , i) =>{
                if(i != 0){
                   text += `,+${ele.toLowerCase()}`
                }else{
                    text += ele
                }
            })

          return text;
           
        }
     }

    
  return (
    //bg-[#FF5200]
    <section className="w-full min-h-[90vh]  bg-[#FF5200]">
      <div className="flex items-center justify-between w-full h-full">
        <img src={left} className="w-[20%]" alt="" />
        <div className="w-full h-[100%] flex items-center gap-10 justify-center flex-col ">
           <div className="flex items-center justify-center gap-3 w-[70%]">
           <div  className="flex border border-[grey]  bg-white rounded-xl h-[60px] w-[30%] items-center justify-center">
                <select onChange={(e) => setSearchBy(e.target.value)}  className="w-full h-full p-3 text-xl font-bold text-[#7e7e7e] outline-none" name="" id="">
                    <option value="false">By Recipes</option>
                    <option value="true">By Ingredients</option>
                </select>
            </div>
          <div className="flex border border-[grey]  bg-white rounded-xl h-[60px] w-[70%] items-center justify-center">
          <input onChange={(e) =>setSearchVal(e.target.value)} className="w-[90%]  text-xl font-bold  outline-none px-4  "
            type="text"
            placeholder="Search by ingredients and dish names"
          />
         <button onClick={recipeFn} className="hover:bg-[#e9e9e9] w-[50px] cursor-pointer grid place-items-center rounded-full h-[50px]" >
         <GoSearch style={{fontSize :" 1.7rem"}}/> 
         </button>

          </div>
           </div>
          <div className="flex items-center justify-center ">
            <div className=" bg-white relative rounded-4xl h-[230px] w-[70%] p-8">
              
              <h1 className="font-[900] flex gap-2 text-4xl"> <span><PiCookingPotFill/></span>Find It. Cook It. Love It</h1>
              <div className="flex items-center justify-start">
              <p className="w-[65%] text-xl pt-5 text-[#3d3d3d]"> A simple and memorable line that highlights the app’s core value—discovering recipes, cooking them, and falling in love with the results. Great for all users, from beginners to foodies.</p>
              <img className="absolute right-3 bottom-5 w-[35%] rounded-full" src={kfc} alt="" />
              </div>


            </div>
          
          </div>
        </div>
        <img className="w-[20%]" src={right} alt="" />
      </div>

     {
        recipes.length > 0 ?  <div className=" w-full bg-white p-10 ">
        <h1 className="text-4xl font-bold pb-10">Recipes you may Like :</h1>
        <div className="flex flex-wrap gap-10">
        {
          recipes.map((ele, i ) =>{
              return <RecipeCard key={`${ele.id}_${i}}`} {...ele} />
          })
        }
        </div>
      
      <div className="w-full relative grid place-items-center h-[100px]">
          <button  onClick={handleShowMore} className="w-[100px] active:scale-[0.8] transition-all h-[40px] bg-[green] font-bold shadow-[1px_1px_5px_grey] text-white rounded-xl grid place-items-center">Show More</button>
         <a className="absolute right-5" href="#"> <button className="w-[50px]  active:scale-[0.8] transition-all h-[50px] grid place-items-center rounded-full bg-white shadow-[0px_0px_10px_grey] p-2"><FaArrowUp/></button></a>
        </div> 
      
    </div> : null
     }
    </section>
  );
};

export default Home;
