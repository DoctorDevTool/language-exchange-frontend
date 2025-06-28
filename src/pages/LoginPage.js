import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/authService';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
} from '@mui/material';

function LoginPage() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

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
            </Box>
        </Container>
    );
}

export default LoginPage;
