import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Modal,
} from "@mui/material";
import { useHistory } from "react-router-dom";

function Ranking() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(
        query(usersCollection, orderBy("score", "desc"))
      );
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleBackHome = () => {
    history.push("/");
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
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Ranking
            </Typography>
            {users.map((user, index) => (
              <Box key={user.id} sx={{ marginBottom: "15px" }}>
                <Typography variant="body1" component="p">
                  {index + 1}. {user.name} - Score: {user.score}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px 0",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpen(user.avatar)}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ height: "100px" }}
                  />
                </Box>
              </Box>
            ))}
            <Button variant="contained" fullWidth onClick={handleBackHome}>
              Back Home
            </Button>
          </CardContent>
        </Card>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 0,
              width: "100%",
              maxWidth: "95vw",
              maxHeight: "95vh",
              overflow: "auto",
            }}
          >
            <img
              src={selectedImage}
              style={{ width: "100%", height: "auto" }}
              alt="Selected"
            />
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default Ranking;
