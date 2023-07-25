import React from "react";
import { Button, Card, CardContent, Typography, Container, Box } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

function Score() {
  const history = useHistory();
  const location = useLocation();
  const { name, avatar, score, rank } = location.state;

  const handleBackHome = () => {
    history.push("/");
  };

  const handleTryAgain = () => {
    history.push("/upload");
  };

  return (
    <Container maxWidth="md" disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "0 20px",
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Your Score
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0",
              }}
            >
              <img src={avatar} alt={name} style={{ height: "200px" }} />
            </Box>
            <Typography variant="h5" component="p" sx={{ textAlign: 'center', marginTop: '10px' }}>
              {name}
            </Typography>
            <Typography variant="h3" component="p" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'orange' }}>
              Score: {score}
            </Typography>
            <Typography variant="h5" component="p" sx={{ textAlign: 'center', marginTop: '10px' }}>
              現在の順位: {rank} 位
            </Typography>
            <Button
              variant="contained"
              fullWidth
              style={{marginTop: '10px'}}
              onClick={handleBackHome}
            >
              Back Home
            </Button>
            <Button
              variant="contained"
              fullWidth
              style={{marginTop: '10px'}}
              onClick={handleTryAgain}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Score;
