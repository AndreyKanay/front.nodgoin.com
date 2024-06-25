import {createBrowserRouter} from "react-router-dom";
import ClickerPage from "./pages/ClickerPage.tsx";
import FrensPage from "./pages/FrensPage.tsx";
import EarnPage from "./pages/EarnPage.tsx";
import BoostPage from "./pages/BoostPage.tsx";
import RatingPage from "./pages/RatingPages/RatingPage.tsx";
import CreateSquad from "./pages/Squads/CreateSquad.tsx";

export const routes = createBrowserRouter([
    {path: "/", element: <ClickerPage />},
    {path: "/frens", element: <FrensPage />},
    {path: "/earn", element: <EarnPage />},
    {path: "/boosts", element: <BoostPage />},
    {path: "/rating", element: <RatingPage />},
    {path: "/squad/create", element: <CreateSquad />},
])