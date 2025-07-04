import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../services/requestService';
import { Card, Typography } from '@mui/material';

const MatchesPage = () => {
  const dispatch = useDispatch();
  const  {matches, status}  = useSelector(state => state.reqs);
  const user = useSelector(state => state.auth.user)

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
          <Typography>{user.id === match.from_user_id ? match.toUser.full_name : match.fromUser.full_name}</Typography>
          <Typography>{user.id === match.from_user_id ? match.toUser.email : match.fromUser.email}</Typography>
          <Typography>Connected on: {match.updated_at.match(/^\d{4}-\d{2}-\d{2}/g)}</Typography>
        </Card>
      ))}
    </>
  );
};

export default MatchesPage;