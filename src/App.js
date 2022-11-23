import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/Login/sub-pages/AuthProvider";
import { ThemeProvider } from "./utils/useBackground";
import { BookingProvider } from "./utils/useBookingList";
import { ActBookingProvider } from "./utils/useActBookingList";
import { BookingCartProvider } from "./utils/useBookingCart";
import { useSpinner } from "./useSpinner";

// import 路由
import Landing from "./pages/LandingPage";
import Home from "./pages/Home";
import Atv from "./pages/Act/Atv";
import Float from "./pages/Act/Float";
import Night from "./pages/Act/Night";
import Upstream from "./pages/Act/Upstream";
import ActReservation from "./pages/Act/ReservationAct";
import Booking from "./pages/Booking";
import Member from "./pages/Member/Member";
import Recipes from "./pages/Recipes";
import RecipesPage2 from "./pages/Recipes/components/recipesPage2";
import PhotoWall from "./pages/Recipes/components/photoWall";

import SuMap from "./pages/SuMap/SuMap";
// import Login from "./pages/Login";
import NoFound from "./pages/noFound";
// import Create from "./pages/Booking/sub-pages/Create";
import Cart from "./pages/Carts/CartItem";
// import Navbar from "./components/Navbar";
// import Footer from "./components/footer";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import MRegister from "./pages/Register/components/MRegister";
import BookingDetail from "./pages/Booking/sub-pages/BookingDetail";
import SuMapBeauty from "./pages/SuMap/SuMapBeauty";
import ForgotPassword from "./pages/Register/components/ForgotPassword";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider>
                        <BookingProvider>
                            <BookingCartProvider>
                                <ActBookingProvider>
                                    <Layout>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={<Landing />}
                                            />
                                            <Route path="/shuyoung">
                                                <Route index element={<Home />} />
                                                <Route path="Act">
                                                    <Route
                                                        path="Atv"
                                                        element={<Atv />}
                                                    />
                                                    <Route
                                                        path="Float"
                                                        element={<Float />}
                                                    />
                                                    <Route
                                                        path="Night"
                                                        element={<Night />}
                                                    />
                                                    <Route
                                                        path="Upstream"
                                                        element={<Upstream />}
                                                    />
                                                    <Route
                                                        path="ActReservation"
                                                        element={<ActReservation />}
                                                    />
                                                </Route>

                                                <Route path="Booking">
                                                    <Route
                                                        index
                                                        element={<Booking />}
                                                    />
                                                    <Route
                                                        path="BookingDetail"
                                                        element={<BookingDetail />}
                                                    />
                                                </Route>

                                                <Route path="Member">
                                                    <Route
                                                        index
                                                        element={<Member />}
                                                    />
                                                    {/* <Route path="Coupon" element={<Coupon />} />
                                                <Route path="Keep" element={<Keep />} /> */}
                                                </Route>

                                            <Route
                                                path="Recipes"
                                            >
                                                <Route
                                                    index
                                                    element={<Recipes />}
                                                />
                                                <Route
                                                    path="recipesPage2/:sid"
                                                    element={<RecipesPage2  />}
                                                />
                                                <Route
                                                    path="photoWall"
                                                    element={<PhotoWall />}
                                                />
                                            </Route>

                                                <Route path="SuMap">
                                                    <Route
                                                        index
                                                        element={<SuMap />}
                                                    />
                                                    <Route
                                                        path="beauty"
                                                        element={<SuMapBeauty />}
                                                    />
                                                </Route>
                                                <Route
                                                    path="Cart"
                                                    element={<Cart />}
                                                />
                                                <Route path="Join">
                                                    <Route
                                                        index
                                                        element={<Register />}
                                                    />
                                                    <Route
                                                        path="Register"
                                                        element={<MRegister />}
                                                    />
                                                    <Route
                                                        path="resetPassword"
                                                        element={<ForgotPassword />}
                                                    />
                                                </Route>
                                                {/* 404未找到的頁面路由，需放在最下方 */}
                                                <Route
                                                    path="*"
                                                    element={<NoFound />}
                                                />
                                            </Route>
                                        </Routes>
                                    </Layout>
                                </ActBookingProvider>
                            </BookingCartProvider>
                        </BookingProvider>
                    </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
