import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import {
    Snackbar,
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
} from '@mui/material';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { status, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
       try{
        e.preventDefault();
        setEmail('');
        setPassword('');
        setSuccess(true);
        dispatch(login({ email, password }));
       }catch(err){
        console.error('Login failed:', err);
       }
    };

    useEffect(() => {
        if (status === 'succeeded') {
            setSuccess(true);
            setTimeout(() => {
                navigate('/profile'); 
            }, 1000); 
        }
    }, [status, navigate]);

    return (
        <Container maxWidth='sm'>
            <Box mt={5}>
                <Typography variant='h4' gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Email'
                        margin='normal'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        type='password'
                        margin='normal'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={status === 'loading'}>
                        {status === 'loading' ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={success && status === 'succeeded'}
                    autoHideDuration={2000}
                    onClose={() => setSuccess(false)}>
                    <Alert
                        onClose={() => setSuccess(false)}
                        severity='success'
                        sx={{ width: '100%' }}>
                        Logged In!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default LoginPage;
