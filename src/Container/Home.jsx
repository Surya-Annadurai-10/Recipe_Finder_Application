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
import { FaAngleDoubleDown } from "react-icons/fa";

const Home = () => {
  const { recipes, setRecipes } = useContext(DataContext);
  const [searchBy, setSearchBy] = useState(false);
  const [offset, setOffset] = useState(0);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const recipeFn = async () => {
    const apiKey = "d982f91bfba3486da1932852f2a58199";
    if (!searchBy) {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchVal.toLowerCase()}&number=24&offset=${offset}&apiKey=${apiKey}`
      );
      setRecipes([...recipes, ...res.data.results]);
      setShowScrollDown(true);
      console.log(res.data.results);
    } else {
      const val = handleInput(searchVal);
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${val}&number=24&offset=${offset}&apiKey=${apiKey}`
      );
      // setRecipes(res.data)
      setRecipes([...recipes, ...res.data]);

      setShowScrollDown(true);
      console.log(res.data);
    }
  };

  const handleShowMore = () => {
    setOffset((prev) => prev + 24);
    recipeFn();
  };

  const handleInput = (val) => {
    if (!searchBy) {
      setSearchVal(val);
    } else {
      const splittedText = val.split(" ");
      let text = "";
      splittedText.map((ele, i) => {
        if (i != 0) {
          text += `,+${ele.toLowerCase()}`;
        } else {
          text += ele;
        }
      });

      return text;
    }
  };

  return (
    //bg-[#FF5200]
    <section className="w-full min-h-[90vh] relative bg-[#FF5200]">
      <div className="flex items-center  justify-between w-full h-[90vh]">
        <img src={left} className="md:w-[30%] w-[45%]   lg:w-[20%]" alt="" />
        <div className="w-full h-[100%] lg:relative flex absolute  top-0 items-center gap-10 justify-start pt-20 flex-col ">
          <div className="flex md:flex-row flex-col items-center justify-center gap-3 w-[100%] md:w-[70%]">
            <div className="flex  border border-[grey]  bg-white rounded-xl h-[60px] w-[80%] md:w-[30%] items-center justify-center">
              <select
                onChange={(e) => setSearchBy(e.target.value)}
                className="w-full h-full p-3 md:text-xl font-bold text-[#7e7e7e] outline-none"
                name=""
                id=""
              >
                <option value="false">By Recipes</option>
                <option value="true">By Ingredients</option>
              </select>
            </div>
            <div className="flex border border-[grey]  bg-white rounded-xl h-[60px] w-[80%] md:w-[70%] items-center justify-center">
              <input
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-[90%]  md:text-xl font-bold  outline-none px-4  "
                type="text"
                placeholder="Search by ingredients and dish names"
              />
              <button
                onClick={recipeFn}
                className="hover:bg-[#e9e9e9] w-[50px] cursor-pointer grid place-items-center rounded-full h-[50px]"
              >
                <GoSearch style={{ fontSize: " 1.7rem" }} />
              </button>
            </div>
          </div>
          <div className="flex items-center  justify-center ">
            <div className=" bg-white shadow-[0px_0px_5px_white] relative rounded-4xl min-h-[230px] w-[80%] md:w-[70%] p-6 md:p-8">
              <h1 className="font-[900] flex items-center gap-2 text-2xl md:text-4xl">
                {" "}
                <span>
                  <PiCookingPotFill />
                </span>
                Find It. Cook It. Love It
              </h1>
              <div className="flex items-center justify-start">
                <p className="w-[65%]  md:text-xl pt-5 text-[#3d3d3d]">
                  {" "}
                  A simple and memorable line that highlights the app’s core
                  value—discovering recipes, cooking them, and falling in love
                  with the results. Great for all users, from beginners to
                  foodies.
                </p>
                <img
                  className="absolute right-3 bottom-5 w-[35%] rounded-full"
                  src={kfc}
                  alt=""
                />
              </div>
            </div>
          </div>
      {showScrollDown ? (
        <>
          <a href="#1"  >
            <h3  className="flex font-bold capitalize text-[white] gap-2  items-center justify-center w-full"> 
              <span>scroll down</span>
              <FaAngleDoubleDown className="text-2xl"  />
            </h3>
          </a>
        </>
      ) : null}
        </div>
        <img className="md:w-[30%] w-[45%]   lg:w-[20%]" src={right} alt="" />
      </div>
      {recipes.length > 0 ? (
        <div id="1" className=" w-full  bg-white md:py-10 md:px-4 lg:p-10 ">
          <h1 className="md:text-4xl text-2xl font-bold px-3 py-10">
            Recipes you may Like :
          </h1>
          <div className="flex justify-center md:items-center flex-wrap gap-10">
            {recipes.map((ele, i) => {
              return <RecipeCard key={`${ele.id}_${i}}`} {...ele} />;
            })}
          </div>

          <div className="w-full relative grid place-items-center h-[100px]">
            <button
              onClick={handleShowMore}
              className="w-[100px] active:scale-[0.8] transition-all h-[40px] bg-[green] font-bold shadow-[1px_1px_5px_grey] text-white rounded-xl grid place-items-center"
            >
              Show More
            </button>
            <a className="absolute right-5" href="#">
              {" "}
              <button className="w-[50px]  active:scale-[0.8] transition-all h-[50px] grid place-items-center rounded-full bg-white shadow-[0px_0px_10px_grey] p-2">
                <FaArrowUp />
              </button>
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Home;
