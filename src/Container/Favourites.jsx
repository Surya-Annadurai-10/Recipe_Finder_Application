import React, { useContext, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { DataContext } from "../App";
import RecipeCard from "../Components/RecipeCard";
import loader from "../assets/loader.gif";
const Favourites = () => {
  const ctx = useContext(DataContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serachedVal, setSearchedVal] = useState([]);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    const LS = JSON.parse(localStorage.getItem("favItems"));

    if (LS != null) {
      setData(LS);
      ctx.setFavourite(LS);
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSearch = (val) => {};
  return (
    <>
      {!isLoading ? (
        <section className="w-full min-h-[90vh] ">
          {ctx.favourite.length > 0 ? (
            <>
              <div className="flex border m-auto my-5 border-[grey]  bg-white rounded-xl h-[60px] w-[70%] items-center justify-center">
                <input
                  onChange={(e) => {setInputVal(e.target.value)
                    console.log("input" , inputVal);}
                    
                  }
                  value={inputVal}
                  className="w-[90%]  text-xl font-bold  outline-none px-4  "
                  type="text"
                  placeholder="Search favourites..."
                />
                <button className="hover:bg-[#e9e9e9] w-[50px] cursor-pointer grid place-items-center rounded-full h-[50px]">
                  <GoSearch style={{ fontSize: " 1.7rem" }} />
                </button>
              </div>
              <div className="flex items-center   px-10 justify-start gap-10 flex-wrap">
                {ctx.favourite
                  .filter((elem) => elem.title.includes(inputVal))
                  .map((ele, i) => {
                    console.log("ele", ele);
                    console.log("input", inputVal);

                    return (
                      <RecipeCard key={`${ele.id}_${i}`} {...ele} del={true} />
                    );
                  })}
              </div>
            </>
          ) : (
            <div className="w-full h-[90vh] grid place-items-center">
              <h1 className="font-bold text-3xl">No Data...</h1>
            </div>
          )}
        </section>
      ) : (
        <div className="w-full h-[90vh] grid place-items-center">
          <img src={loader} alt="" />
        </div>
      )}
    </>
  );
};

export default Favourites;
