import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { clearUsers } from '../features/usersSlice';
import { clearLanguages } from '../features/languageControlSlice';
import { clearReqs } from '../features/requestsSlice';
import { getMe } from '../services/authService';
import { getAllLanguages } from '../services/languageControlService';

const Navbar = () => {
    const { token, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAccAndLang = () => {
        dispatch(getMe(token));
        dispatch(getAllLanguages());
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearUsers());
        dispatch(clearLanguages());
        dispatch(clearReqs());
        navigate('/login');
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    <Button color='inherit' component={Link} to='/'>
                        LangExchange
                    </Button>
                </Typography>
                {token && user.full_name === 'Admin' ? (
                    <>
                        <Button
                            color='warning'
                            onClick={getAccAndLang}
                            component={Link}
                            to='/languages'>
                            Languages
                        </Button>
                        <Button
                            color='inherit'
                            onClick={getAccAndLang}
                            component={Link}
                            to='/profile'>
                            Profile
                        </Button>
                        <Button
                            color='inherit'
                            onClick={getAccAndLang}
                            component={Link}
                            to='/search'>
                            Search Partner
                        </Button>
                        <Button color='inherit' component={Link} to='/requests'>
                            Requests
                        </Button>
                        <Button color='inherit' component={Link} to='/matches'>
                            Matches
                        </Button>
                        <Button
                            color='inherit'
                            variant='outlined'
                            sx={{ m: 2 }}
                            onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : token ? (
                    <>
                        <Button
                            color='inherit'
                            onClick={getAccAndLang}
                            component={Link}
                            to='/profile'>
                            Profile
                        </Button>
                        <Button
                            color='inherit'
                            onClick={getAccAndLang}
                            component={Link}
                            to='/search'>
                            Search Partner
                        </Button>
                        <Button color='inherit' component={Link} to='/requests'>
                            Requests
                        </Button>
                        <Button color='inherit' component={Link} to='/matches'>
                            Matches
                        </Button>
                        <Button
                            color='inherit'
                            variant='outlined'
                            sx={{ m: 2 }}
                            onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color='inherit' component={Link} to='/login'>
                            Login
                        </Button>
                        <Button
                            color='inherit'
                            variant='outlined'
                            sx={{ m: 2 }}
                            component={Link}
                            to='/register'>
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
