import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PartnerSearchPage from './pages/PartnerSearchPage';
import PartnerListPage from './pages/PartnersListPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                    path='/profile'
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/search'
                    element={
                        <PrivateRoute>
                            <PartnerSearchPage />
                            <PartnerListPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/list'
                    element={
                        <PrivateRoute>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
