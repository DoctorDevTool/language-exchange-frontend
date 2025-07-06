import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Chip,
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Autocomplete,
    TextField,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { langUpdate } from '../services/authService'

const ProfilePage = () => {
    const user = useSelector((state) => state.auth.user);
    const availableLanguages = useSelector(
        (state) => state.langControl.languages
    );

    const currentNative = user.languages?.filter(
        (language) => language.type === 'native'
    );
    const currentTarget = user.languages?.filter(
        (language) => language.type === 'target'
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nativeLanguages, setNativeLanguages] = useState([]);
    const [targetLanguages, setTargetLanguages] = useState([]);
    const [success, setSuccess] = useState(false);

    const toSendNative = nativeLanguages.map(
        (lang) => availableLanguages.find((obj) => obj.name === lang).id
    );
    const toSendTarget = targetLanguages.map(
        (lang) => availableLanguages.find((obj) => obj.name === lang).id
    );

    const toSendForm = {
        native: toSendNative,
        target: toSendTarget,
    };

    function handleSave() {
        try {
            dispatch(langUpdate(toSendForm));
            setSuccess(true);
            setNativeLanguages([]);
            setTargetLanguages([]);
        } catch (err) {
            console.error('Update failed:', err);
        }
    }
    if (!user) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant='h6'>You are not logged in.</Typography>
                <Button
                    variant='contained'
                    onClick={() => navigate('/login')}
                    sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
        );
    }

    return (
        <Box textAlign={'center'} sx={{ p: 3 }}>
            <Typography variant='h5' gutterBottom>
                My Profile
            </Typography>

            <Card>
                <CardContent>
                    <Typography variant='h6'>{user.full_name}</Typography>
                    <Typography>Email: {user.email}</Typography>

                    <Box sx={{ mt: 3 }}>
                        <Autocomplete
                            sx={{ mt: 1 }}
                            multiple
                            options={availableLanguages?.map(
                                (lang) => lang.name
                            )}
                            value={nativeLanguages}
                            onChange={(e, value) => setNativeLanguages(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Select native languages'
                                />
                            )}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant='subtitle1'>
                                Current Native Languages:
                            </Typography>
                            {currentNative?.map((lang) => (
                                <Chip
                                    key={lang.language_id}
                                    label={lang.name}
                                    sx={{ mr: 1, mt: 1 }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Autocomplete
                            multiple
                            options={availableLanguages?.map(
                                (lang) => lang.name
                            )}
                            value={targetLanguages}
                            onChange={(e, value) => setTargetLanguages(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Select target languages'
                                />
                            )}
                            sx={{ mt: 1 }}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant='subtitle1'>
                                Current Target Languages:
                            </Typography>
                            {currentTarget?.map((lang) => (
                                <Chip
                                    key={lang.language_id}
                                    label={lang.name}
                                    sx={{ mr: 1, mt: 1 }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Button
                        variant='contained'
                        onClick={handleSave}
                        sx={{ mt: 3 }}>
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            <Snackbar
                open={success}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}>
                <Alert
                    onClose={() => setSuccess(false)}
                    severity='success'
                    sx={{ width: '100%' }}>
                    Profile updated!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProfilePage;
