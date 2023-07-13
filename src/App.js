import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App() {
  const [page, setPage] = useState('home');

  const startHandler = () => {
    setPage('upload');
  }

  const rankingHandler = () => {
    setPage('ranking');
  }

  if (page === 'home') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          顔面強さランキング
        </Typography>
        <Button variant="contained" onClick={startHandler}>START</Button>
        <Button variant="contained" onClick={rankingHandler}>RANKING</Button>
      </Box>
    );
  }
  // 他のページ (upload, ranking) の表示をここに追加...
}

export default App;