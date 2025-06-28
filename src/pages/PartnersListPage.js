import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import { createReq, deleteReq } from '../services/requestService';

const PartnerListPage = () => {
    const { list, status, error } = useSelector((state) => state.users);
    const reqList = useSelector((state) => state.reqs.pending);

    const dispatch = useDispatch();

    const handleSend = (e) => {
        dispatch(createReq(e));
    };
    const handleCancel = (e) => {
        dispatch(deleteReq(e));
    };

    if (status === 'loading') return <CircularProgress sx={{ m: 3 }} />;
    if (error) return <Alert severity='error'>{error}</Alert>;
    if (status === 'succeeded' && list.length === 0)
        return <Typography sx={{ m: 3 }}>No partners found.</Typography>;

    return (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            {list.map((user) => (
                <Card key={user.id} sx={{ display: 'inline-block', m: 1 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant='h5'>{user.full_name}</Typography>
                        <Typography sx={{ mt: 1 }}>
                            Native:{' '}
                            {user.UserLanguages?.filter(
                                (lang) => lang.type === 'native'
                            ).map((lang) => `${lang.Language.name} `)}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Target:{' '}
                            {user.UserLanguages?.filter(
                                (lang) => lang.type === 'target'
                            ).map((lang) => `${lang.Language.name} `)}
                        </Typography>

                        {reqList?.find((req) => req.to_user_id === user.id) ? (
                            <Button
                                sx={{ mt: 2 }}
                                variant='outlined'
                                color='error'
                                fullWidth
                                value={
                                    (reqList?.find(
                                        (req) => req.to_user_id === user.id
                                    )).id
                                }
                                type='button'
                                onClick={(e) => handleCancel(e.target.value)}>
                                Cancel Request
                            </Button>
                        ) : (
                            <Button
                                sx={{ mt: 2 }}
                                variant='contained'
                                fullWidth
                                value={user.id}
                                type='button'
                                onClick={(e) => handleSend(e.target.value)}>
                                Send request
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default PartnerListPage;
