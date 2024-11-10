import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AppLayout from "../views/layouts/AppLayout";
import ErrorPage from "../views/pages/ErrorPage";
import Home from "../views/pages/Home";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>

            <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />
                {/* <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} /> */}
            </Route>

        </Route>
    )
);