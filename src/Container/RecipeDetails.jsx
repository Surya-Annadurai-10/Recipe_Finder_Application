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
        const apiKey = "d982f91bfba3486da1932852f2a58199";

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

    <div>
      <h1 className="text-2xl md:text-3xl  font-bold py-5">{dishDetails.title}</h1>
      <div className="flex w-[100%] lg:flex-row flex-col rounded-md items-start gap-5 justify-start">
        <div className="lg:w-[50%] w-[98%] md:w-[90%] m-auto">
          <img
            className=" w-full rounded-md h-full"
            src={dishDetails.image}
            alt={dishDetails.title}
          />
        </div>
        <div className="lg:w-[50%] w-[98%] md:w-[90%] m-auto">
          <div className=" w-[100%] max-h-[420px]  danger overflow-y-scroll bg-[#ff510046] p-5 rounded">
            <h1 className="font-bold text-3xl pb-3">How to Cook ? </h1>

            <div
              className="text-[16px]  h-full w-full "
              dangerouslySetInnerHTML={{ __html: dishDetails.instructions }}
            ></div>
          </div>
          <div className="flex items-center p-4 justify-center lg:justify-start gap-10">
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
              <h2 className="font-bold text-center text-xl">
                $ {dishDetails.pricePerServing} per Serving
              </h2>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center gap-1">
                <IoHeartCircleSharp fontSize={"2rem"} color="red" />
              </div>
              <h2 className="font-bold text-center text-xl">
                {" "}
                {dishDetails.aggregateLikes} Likes
              </h2>
            </div>

            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center gap-1">
                <MdTimer fontSize={"2rem"} color="purple" />
              </div>
              <h2 className="font-bold text-center text-xl">
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

    
        <h1 className="font-bold text-2xl md:text-4xl py-4">Nutritional Information :</h1>
        <table className="md:w-[80%] m-auto w-[100%]">
          <thead className="bg-[#FF5200]  text-white">
            <th className="text-xl md:text-3xl py-3">Nutritions</th>
            <th className="text-xl md:text-3xl py-3">per serving</th>
          </thead>
          <tbody className="bg-[#ff51004b] px-3 py-4 text-xl md:text-xl">
                <tr>
                  <td className="font-bold py-2">Carbohydrates</td>
                  <td> {Math.round(dishDetails.nutrition.caloricBreakdown?.percentCarbs)} %</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">Fats</td>
                  <td> {Math.round(dishDetails?.nutrition.caloricBreakdown?.percentFat)} %</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">Proteins</td>
                  <td> {Math.round(dishDetails?.nutrition.caloricBreakdown?.percentFat)} %</td>
                </tr>
                <tr>
                  <td className="font-bold py-2">Health Score</td>
                  <td> {Math.round(dishDetails?.healthScore)}</td>
                </tr>

                {
          dishDetails.nutrition.nutrients.map((ele ,i) =>{
            return <tr key={`${ele.amount}_${ele.percentOfDailyNeeds}_{i}`}>
              <td className="font-bold py-2">{ele.name}</td>
              <td>{ele.amount} {ele.unit}</td>
              {/* <h2><span className="font-bold ">{ele.name} : </span>{ele.amount} {ele.unit}</h2> */}
            </tr>
          })
        }

          </tbody>
        </table>
      


      {/* <div>
        {
          dishDetails.nutrition.nutrients.map((ele ,i) =>{
            return <div key={`${ele.amount}_${ele.percentOfDailyNeeds}_{i}`}>
              <h2><span className="font-bold ">{ele.name} : </span>{ele.amount} {ele.unit}</h2>
            </div>
          })
        }
      </div> */}
    </div>
  </div>
   }
    </>
  );
};

export default RecipeDetails;

{/* <div>
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
 
</ul>
</div>  */}