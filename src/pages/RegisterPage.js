import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../services/authService';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
} from '@mui/material';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form));
    };

    return (
        <Container maxWidth='sm'>
            <Box mt={5}>
                <Typography variant='h4' gutterBottom>
                    Register
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Username'
                        name='full_name'
                        margin='normal'
                        value={form.full_name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label='Email'
                        name='email'
                        margin='normal'
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        name='password'
                        type='password'
                        margin='normal'
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={status === 'loading'}>
                        {status === 'loading' ? 'Registering...' : 'Register'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterPage;
