import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiCurrencyDollar } from "react-icons/hi2";
import { IoHeartCircleSharp } from "react-icons/io5";
import { MdTimer } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { DataContext } from "../App";
import loader from "../assets/loader.gif"

const RecipeDetails = () => {
  const [dishDetails, setDishDetails] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [extendedIngredients, setExtendedIngredients] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
      const ctx = useContext(DataContext);
  

  const params = useParams();
  console.log(params, "params");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "2e9c02b184c542ca9d95a167c25d9624";

        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${params.id}/information?includeNutrition=true&apiKey=${apiKey}`
        );
        console.log(res.data, "res data");
        setDishDetails(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id) =>{
    console.log(id , "id");

  if(!isFav){
   const find = ctx.recipes.find(ele => ele.id == id);
   console.log(find , "find");
   let obj = [
      ...ctx.favourite,
      find
   ]
   
   ctx.setFavourite(obj);
  }
    
}



  return (
    <>
   {
    isLoading ? <div className="w-full h-[90vh] grid place-items-center ">
    <img src={loader} alt="" />
    </div>:  <div className="p-4">
    {/* <div
      onClick={() => {
        setIsFav(true);
        handleClick(dishDetails.id);
      }}
      className="w-[200px] h-[40px] bg-[#FF5200] text-white font-bold grid place-items-center cursor-pointer rounded-md hover:bg-[#FF9500]"
    >
      <h1>
        {isFav ? (
          <span className="flex items-center justify-center gap-2">
            Added{" "}
            <span className="bg-white grid relative place-items-center rounded-full">
              <FaCheckCircle style={{ color: "green", fontSize: "1.2rem" }} />
            </span>
          </span>
        ) : (
          "+ Add to Favourites"
        )}
      </h1>
    </div> */}

    <div>
      <h1 className="text-3xl  font-bold py-5">{dishDetails.title}</h1>
      <div className="flex w-[100%] rounded-md items-start gap-5 justify-center">
        <div className="w-[50%]">
          <img
            className=" w-full rounded-md h-full"
            src={dishDetails.image}
            alt={dishDetails.title}
          />
        </div>
        <div className="w-[50%]">
          <div className=" w-[100%] max-h-[420px]  danger overflow-y-scroll bg-[#ff510046] p-5 rounded">
            <h1 className="font-bold text-3xl pb-3">How to Cook ? </h1>

            <div
              className="text-[16px]  h-full w-full "
              dangerouslySetInnerHTML={{ __html: dishDetails.instructions }}
            ></div>
          </div>
          <div className="flex items-center p-4 justify-start gap-10">
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center gap-1">
                <HiCurrencyDollar
                  style={{ fontSize: "2rem" }}
                  color="orange"
                />{" "}
                <HiCurrencyDollar
                  style={{ fontSize: "2rem" }}
                  color="orange"
                />
              </div>
              <h2 className="font-bold text-xl">
                $ {dishDetails.pricePerServing} per Serving
              </h2>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center gap-1">
                <IoHeartCircleSharp fontSize={"2rem"} color="red" />
              </div>
              <h2 className="font-bold text-xl">
                {" "}
                {dishDetails.aggregateLikes} Likes
              </h2>
            </div>

            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center gap-1">
                <MdTimer fontSize={"2rem"} color="purple" />
              </div>
              <h2 className="font-bold text-xl">
                Ready in {dishDetails.readyInMinutes} minutes
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-4xl py-5 font-bold">Ingredients :</h1>
        <div className="flex items-start gap-5 flex-wrap justify-start">
          {dishDetails.extendedIngredients?.map((ele, i) => {
            return (
              <div
                className="bg-[#ececec] p-2 rounded-md"
                key={`${ele.id}_${i}`}
              >
                <h1 className="font-bold capitalize text-center w-[100%]">
                  {ele.name}
                </h1>
                <div className="h-[100px] grid place-items-center">
                  <img
                    src={`https://img.spoonacular.com/ingredients_100x100/${ele.image}`}
                    alt={ele.image}
                  />
                </div>
                <h2>
                  <span className="font-bold">Quantity :</span>{" "}
                  {ele.measures.metric.amount} {ele.measures.metric.unitLong}
                </h2>
              </div>
            );
          })}
        </div>
      </div>

      {
        dishDetails ? <div>
        <h1 className="text-4xl font-bold py-5">Nutritional Information :</h1>
        <ul>
          <h3>
            <span className="font-bold"> Carbohydrates : </span>
            {Math.round(dishDetails.nutrition.caloricBreakdown?.percentCarbs)}
            %
          </h3>
          <h3>
            <span className="font-bold">Fats : </span>{" "}
            {Math.round(dishDetails?.nutrition.caloricBreakdown?.percentFat)}%
          </h3>
          <h3>
            <span className="font-bold">Proteins : </span>
            {Math.round(
              dishDetails?.nutrition.caloricBreakdown?.percentProtein
            )}
            %
          </h3>
          <h3><span className="font-bold">Health Score : </span>{Math.round(dishDetails?.healthScore)}</h3>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div> : null
      }


      <div>
        {
          dishDetails.nutrition.nutrients.map((ele ,i) =>{
            return <div key={`${ele.amount}_${ele.percentOfDailyNeeds}_{i}`}>
              <h2><span className="font-bold ">{ele.name} : </span>{ele.amount} {ele.unit}</h2>
            </div>
          })
        }
      </div>
    </div>
  </div>
   }
    </>
  );
};

export default RecipeDetails;
