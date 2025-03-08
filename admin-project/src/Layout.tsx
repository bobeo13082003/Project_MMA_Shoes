import './App.css'
import { Routes, Route } from "react-router";
import SidebarPage from './pages/sidebar/SiderbaPage';
import LoginPage from './pages/auths/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import Restaurant from './pages/restaurant/Restaurant';
import MenuPage from './pages/menu/MenuPage';
import Order from './pages/order/Order';
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<Dashboard />} />
                    <Route path='/restaurant' element={<Restaurant />} />
                    <Route path='/menues' element={<MenuPage />} />
                    <Route path='/order' element={<Order />} />
                </Route>
                <Route path='/login' element={<LoginPage />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
        </>
    );
};

export default Layout;