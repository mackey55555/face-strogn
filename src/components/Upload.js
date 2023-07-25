import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase"; // Assume you have a function that returns the initialized Firebase app
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";

function Upload() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBackHome = () => {
    history.push("/");
  };

  const handleUpload = async () => {
    // Ensure a file is selected
    if (!image) {
      alert("Please select an image.");
      return;
    }
    setUploading(true);

    // Upload to Firebase Storage
    const timestamp = Date.now(); // Get current timestamp
    const fileName = `${timestamp}-${image.name}`; // Generate a unique file name
    const storageRef = ref(storage, fileName); // Create a reference
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Listen to state changes
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress, paused, and resumed states here
      },
      (error) => {
        // Handle unsuccessful uploads here
        console.error(error);
      },
      async () => {
        // Handle successful uploads on complete
        const score = Math.floor(Math.random() * 101);
        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const userRef = await addDoc(collection(db, "users"), {
          name: name,
          avatar: fileUrl,
          score: score,
        });

        // Calculate rank
        const userQuery = query(
          collection(db, "users"),
          orderBy("score", "desc")
        );
        const userSnapshot = await getDocs(userQuery);
        let rank = 1;
        userSnapshot.docs.forEach((doc, index) => {
          if (doc.id === userRef.id) {
            rank = index + 1;
          }
        });

        // Set loading state
        setLoading(true);

        // Wait for 5 seconds before navigating to the score screen
        setTimeout(() => {
          // Redirect to the Score screen
          history.push("/score", {
            name: name,
            avatar: fileUrl,
            score: score,
            rank: rank,
          });
          setUploading(false);
        }, 5000);
      }
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "0 20px",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Upload your photo
          </Typography>
          <TextField
            label="名前、もしくはニックネームを入力してください※入力された内容は一般公開されます"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />
          <label htmlFor="upload-photo">
            <input
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Button color="secondary" variant="outlined" component="span">
              Upload Photo
            </Button>
          </label>
          {preview && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0",
              }}
            >
              <img src={preview} alt="preview" style={{ height: "200px" }} />
            </Box>
          )}
          <Button
            variant="contained"
            fullWidth
            disabled={!name || !image || uploading}
            onClick={handleUpload}
          >
            次へ
          </Button>
          {loading && (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <CircularProgress />
            </Box>
          )}
          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "10px" }}
            onClick={handleBackHome}
          >
            Back Home
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Upload;
