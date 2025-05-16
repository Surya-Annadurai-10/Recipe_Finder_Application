
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Container/Home'
import RecipeDetails from './Container/RecipeDetails'
import Favourites from './Container/Favourites'
import Layout from './Layout'
import { createContext, lazy, Suspense, useState } from 'react'

const HomeComponent = lazy(() => import ("./Container/Home"))
const RecipeDetailsComponent = lazy(() => import ("./Container/RecipeDetails"))
const FavouritesComponent = lazy(() => import ("./Container/Favourites"))


const router = createBrowserRouter([
  {
    element : <Layout />,
    children : [
      {
        path:"/",
        element:<Suspense fallback={<div>Loading...</div>}>
          <HomeComponent />
        </Suspense>
      },
      {
        path:"/recipeinfo/:id",
        element :<Suspense fallback={<div>Loading...</div>}>
          <RecipeDetailsComponent/>
        </Suspense>
      },
      {
        path:"/favourites",
        element:<Suspense fallback={<div>Loading...</div>}>
          <FavouritesComponent />
        </Suspense>
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
