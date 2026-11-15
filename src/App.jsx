import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecipeDetails from "./pages/RecipeDetails";
import RecipesList from "./pages/RecipesList";
import About from "./pages/About";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes/:id" element={<RecipeDetails />} />
        <Route path="recipes" element={<RecipesList />} />
        <Route path="*" element={<NotFound />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}