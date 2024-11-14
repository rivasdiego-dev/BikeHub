import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AppLayout from "../views/layouts/AppLayout";
import ErrorPage from "../views/pages/ErrorPage";
import Home from "../views/pages/Home";
import BikesPage from "../views/pages/Bikes";
import BikeDetail from "../views/pages/BikeDetail";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>

            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Home />} />

            <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/bikes" element={<BikesPage />} />
                <Route path="/bikes/:id" element={<BikeDetail />} />
            </Route>

        </Route>
    )
);