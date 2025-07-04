import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchOutgoing } from '../services/requestService';
import { Card, Typography, } from '@mui/material';

const OutgoinReqs = () => {
    const dispatch = useDispatch();
    const { outgoing, status } = useSelector((state) => state.reqs);

    useEffect(() => {
        dispatch(fetchOutgoing());
    }, [dispatch]);

    return (
        <>
            <Typography
                variant='h4'
                sx={{ mt: 2, textAlign: 'center' }}
                gutterBottom>
                Outgoing Requests
            </Typography>
            {status === 'loading' && <p>Loading...</p>}
            {outgoing.length === 0 ? 
            <Typography sx={{textAlign: 'center'}}>No requests yet</Typography> : ""}
            {outgoing.map((req) => (
                <Card
                    variant='outlined'
                    key={req.id}
                    sx={{ p: 2, mb: 2, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{m:2}}>
                        {req.toUser.full_name}
                    </Typography>
                    <Typography>
                        Req was created on:{' '}
                        {req.created_at.match(/^\d{4}-\d{2}-\d{2}/g)}
                    </Typography>
                    <Typography variant='h6'>
                        Status:{' '}
                        {req.status}
                    </Typography>
                </Card>
            ))}
        </>
    );
};

export default OutgoinReqs;
