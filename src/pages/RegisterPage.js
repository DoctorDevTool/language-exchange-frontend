import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../services/authService';
import {
    Snackbar,
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

    const formDefaultState = {
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [form, setForm] = useState(formDefaultState);

    const [passwordError, setPasswordError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setPasswordError(null);
    };

    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }
        setSuccess(true);

        const { confirmPassword, ...userData } = form;
        dispatch(register(userData));
        // setForm({ formDefaultState });
    };

    return (
        <Container maxWidth='sm'>
            <Box mt={5}>
                <Typography variant='h4' gutterBottom>
                    Register
                </Typography>
                {passwordError && (
                    <Alert severity='error'>{passwordError}</Alert>
                )}
                {error && <Alert severity='error'>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Full Name'
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
                    <TextField
                        fullWidth
                        label='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        margin='normal'
                        value={form.confirmPassword}
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
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={success && status === 'succeeded'}
                    autoHideDuration={3000}
                    onClose={() => setSuccess(false)}>
                    <Alert
                        onClose={() => setSuccess(false)}
                        severity='success'
                        sx={{ width: '100%' }}>
                        Registered!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default RegisterPage;
