import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../services/requestService';
import { Card, Typography } from '@mui/material';

const MatchesPage = () => {
  const dispatch = useDispatch();
  const  {matches, status}  = useSelector(state => state.reqs);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{textAlign: 'center', mt: 2}}>Your Matches</Typography>
      {status === 'pending' && <p>Loading...</p>}
      {matches.length === 0 && <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>No matches found</Typography>}
      {matches?.map(match => (
        <Card key={match.id} sx={{ p: 2, mb: 2, textAlign: 'center' }}>
          <Typography>{match.fromUser.full_name}</Typography>
          <Typography>{match.fromUser.email}</Typography>
          <Typography>Was created on: {match.created_at.match(/^\d{4}-\d{2}-\d{2}/g)}</Typography>
        </Card>
      ))}
    </>
  );
};

export default MatchesPage;