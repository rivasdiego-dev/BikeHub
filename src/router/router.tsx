import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AppLayout from "../views/layouts/AppLayout";
import ErrorPage from "../views/pages/ErrorPage";
import Home from "../views/pages/Home";
import BikesPage from "../views/pages/Bikes";
import BikeDetail from "../views/pages/BikeDetail";
import LoginPage from "../views/pages/LoginPage";
import RegisterPage from "../views/pages/RegisterPage";
import AdminGuard from "../components/guards/AuthGuard";
import CartPage from "../views/pages/CartPage";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<AdminGuard />}>
                <Route path="/admin" element={<div> Admin! </div>} />
            </Route>

            <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/bikes" element={<BikesPage />} />
                <Route path="/bikes/:id" element={<BikeDetail />} />
                <Route path="/cart" element={<CartPage />} />
            </Route>

        </Route>
    )
);