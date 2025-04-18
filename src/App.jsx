
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Container/Home'
import RecipeDetails from './Container/RecipeDetails'
import Favourites from './Container/Favourites'
import Layout from './Layout'
import { createContext, useState } from 'react'


const router = createBrowserRouter([
  {
    element : <Layout />,
    children : [
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/recipeinfo/:id",
        element :<RecipeDetails/>
      },
      {
        path:"/favourites",
        element:<Favourites />
      }
    ]
  }
])

export const DataContext = createContext();

function App() {
  const [favourite , setFavourite] = useState([]);
  const [recipes , setRecipes] = useState( [
 
]);

  return (
      <>
     <DataContext value={{favourite ,recipes, setRecipes, setFavourite}}>
     <RouterProvider router={router} />
     </DataContext>
    </>
  )
}

export default App
