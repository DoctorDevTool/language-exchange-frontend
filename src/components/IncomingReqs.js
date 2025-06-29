import { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(fetchIncoming());
    }, [dispatch]);

    const handleRespond = (reqId, accepted) => {
        accepted ? dispatch(acceptReq(reqId)) : dispatch(declineReq(reqId));
    };

    return (
        <>
            <Typography variant='h4' gutterBottom>
                Incoming Requests
            </Typography>
            {status === 'loading' && <p>Loading...</p>}
            {incoming.map((req) => (
                <Card key={req.id} sx={{ p: 2, mb: 2 }}>
                    <Typography>
                        {req.fromUser.full_name} wants to connect
                    </Typography>
                    <Button onClick={() => handleRespond(req.id, true)}>
                        Accept
                    </Button>
                    <Button onClick={() => handleRespond(req.id, false)}>
                        Reject
                    </Button>
                </Card>
            ))}
        </>
    );
};

export default IncomingReqs;
