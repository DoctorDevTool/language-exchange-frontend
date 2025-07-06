import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchIncoming,
    acceptReq,
    declineReq,
} from '../services/requestService';
import { Button, Card, Typography } from '@mui/material';

const IncomingReqs = () => {
    const dispatch = useDispatch();
    const { incoming, status } = useSelector((state) => state.reqs);
    const [handledIds, setHandledIds] = useState([]);

    useEffect(() => {
        dispatch(fetchIncoming());
    }, [dispatch]);

    const handleRespond = (reqId, accepted) => {
        accepted ? dispatch(acceptReq(reqId)) : dispatch(declineReq(reqId));
        setHandledIds((prev) => [...prev, reqId]); 
    };

    const visibleRequests = incoming.filter((req) => !handledIds.includes(req.id));

    return (
        <>
            <Typography variant='h4' sx={{ mt: 2, textAlign: 'center' }} gutterBottom>
                Incoming Requests
            </Typography>
            {status === 'loading' && <p>Loading...</p>}
            {visibleRequests.length === 0 ? (
                <Typography sx={{ textAlign: 'center' }}>No requests yet</Typography>
            ) : (
                visibleRequests.map((req) => (
                    <Card
                        variant='outlined'
                        key={req.id}
                        sx={{ p: 2, mb: 2, textAlign: 'center' }}
                    >
                        <Typography variant='h5'>
                            {req.fromUser?.full_name || 'Loading...'}
                        </Typography>
                        <Typography>
                            Req was created on:{' '}
                            {req.created_at.match(/^\d{4}-\d{2}-\d{2}/g)}
                        </Typography>
                        <Button
                            variant='contained'
                            sx={{ m: 2 }}
                            onClick={() => handleRespond(req.id, true)}
                        >
                            Accept
                        </Button>
                        <Button
                            variant='outlined'
                            color='error'
                            sx={{ m: 2 }}
                            onClick={() => handleRespond(req.id, false)}
                        >
                            Reject
                        </Button>
                    </Card>
                ))
            )}
        </>
    );
};

export default IncomingReqs;