import { useSelector, useDispatch } from 'react-redux';
import { getAllLanguages } from '../services/languageControlService';
import { useEffect, useState } from 'react';
import {
    Alert,
    Container,
    Box,
    Typography,
    Chip,
    TextField,
    Button,
} from '@mui/material';
import { addLanguage } from '../services/languageControlService';

const LanguageControlPage = () => {
    const dispatch = useDispatch();
    const { languages, status, error } = useSelector(
        (state) => state.langControl
    );

    const [newLanguageName, setNewLanguageName] = useState('');

    useEffect(() => {
        dispatch(getAllLanguages());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewLanguageName('')
        dispatch(addLanguage(newLanguageName));
    };

    

    return (
        <Container maxWidth='sm'>
            <Box mt={5}>
                <Typography variant='h4' gutterBottom>
                    Languages
                </Typography>
                {status === 'loading' && (
                    <Typography variant='h6' gutterBottom>
                        Loading...
                    </Typography>
                )}
                {status === 'failed' && (
                    <Box>
                        {languages?.map((language) => (
                            <Chip key={language.id} label={language.name} />
                        ))}
                    </Box>
                )}
                {status === 'succeeded' && (
                    <Box>
                        {languages?.map((language) => (
                            <Chip key={language.id} label={language.name} />
                        ))}
                    </Box>
                )}
            </Box>
            <Box mt={5}>
                <Typography variant='h6' gutterBottom>
                    Add Language
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Language Name'
                        margin='normal'
                        value={newLanguageName}
                        onChange={(e) => setNewLanguageName(e.target.value)}
                        required
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={status === 'loading'}>
                        {status === 'loading' ? 'Adding...' : 'Add'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LanguageControlPage;
