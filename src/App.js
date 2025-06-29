import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PartnerSearchPage from './pages/PartnerSearchPage';
import PartnersList from './components/PartnersList'
import RequestsPage from './pages/RequestsPage';
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
                            <PartnersList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/requests'
                    element={
                        <PrivateRoute>
                            <RequestsPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
