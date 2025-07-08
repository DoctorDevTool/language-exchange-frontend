import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PartnerSearchPage from './pages/PartnerSearchPage';
import PartnersList from './components/PartnersList';
import RequestsPage from './pages/RequestsPage';
import MatchesPage from './pages/MatchesPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import LanguageControlPage from './pages/LanguageControlPage';
import Loader from './components/Loader';

function App() {
    const authStatus = useSelector((state) => state.auth.status);
    const reqStatus = useSelector((state) => state.reqs.status);
    const userStatus = useSelector((state) => state.users.status);

    const isLoading =
        authStatus === 'loading' ||
        reqStatus === 'loading' ||
        userStatus === 'loading';

    return (
        <>
            <Navbar />
            <Loader open={isLoading} />
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
                <Route
                    path='/matches'
                    element={
                        <PrivateRoute>
                            <MatchesPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/languages'
                    element={
                        <PrivateRoute>
                            <LanguageControlPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
