import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';


const PartnerSearchForm = () => {
    const availableLanguages = useSelector((state) => state.users.allLang);

    const [nativeLang, setNative] = useState('');
    const [targetLang, setTarget] = useState('');

    const native = nativeLang ? availableLanguages.find((obj) => obj.name === nativeLang).id : '';
    const target = targetLang ? availableLanguages.find((obj) => obj.name === targetLang).id : '';

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchUsers( {native, target} ));
    };

    return (
        <Box component='form' onSubmit={handleSubmit} sx={{ p: 3}}>
            <Typography variant='h6' gutterBottom>
                Find Language Partners
            </Typography>

            <FormControl fullWidth margin='normal'>
                <InputLabel>Partner's Native Language</InputLabel>
                <Select
                    value={nativeLang}
                    onChange={(e) => setNative(e.target.value)}
                    label='Partner Native Language'
                    required>
                    {availableLanguages.map((lang) => (
                        <MenuItem key={lang.id} value={lang.name}>
                            {lang.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin='normal'>
                <InputLabel>Partner's Target Language</InputLabel>
                <Select
                    value={targetLang}
                    onChange={(e) => setTarget(e.target.value)}
                    label='Partner Target Language'
                    required>
                     {availableLanguages.map((lang) => (
                        <MenuItem key={lang.id} value={lang.name}>
                            {lang.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant='contained' type='submit' sx={{ mt: 2 }}>
                Search
            </Button>
        </Box>
    );
};

export default PartnerSearchForm;
