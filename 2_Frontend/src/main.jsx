import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./utils/extendThemeChakra.js";
import { AuthProvider } from "./Context/AuthContext.jsx";

import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Recipes from "./Pages/Recipes.jsx";
import Generator from "./Pages/Generator.jsx";
import RecipeDetail from "./Pages/RecipeDetail.jsx";
import FirstSteps from "./Pages/FirstSteps.jsx";
import UploadRecipes from "./Pages/UploadRecipes.jsx";
import WeeklyMenu from "./Pages/WeeklyMenu.jsx";
import NotFound from "./Pages/NotFound.jsx";
import NewRecipe from "./Pages/NewRecipe.jsx";
import CreateNewRecipe from "./Pages/CreateNewRecipe.jsx";
import BulkRecipes from "./Pages/BulkRecipes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/first-steps" element={<FirstSteps />} />
              <Route path="/upload-recipes" element={<UploadRecipes />} />
              <Route path="/weekly-menu" element={<WeeklyMenu />} />
              <Route path="/new-recipe" element={<NewRecipe />} />
              <Route path="/create-new-recipe" element={<CreateNewRecipe />} />
              <Route path="/bulk-recipes" element={<BulkRecipes />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
