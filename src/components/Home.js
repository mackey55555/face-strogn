import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
                padding: '0 20px',
            }}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        顔面勇者くん
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        あなたの顔の強さをAIが判定します。
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ゲームを始めるにはSTARTを押してください。自分の顔がどれだけ強いか確認しよう！
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ランキングボタンで他のプレイヤーのスコアを確認できます。
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="contained" onClick={() => history.push("/upload")}>START</Button>
                        <Button variant="outlined" onClick={() => history.push("/ranking")}>RANKING</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Home;
