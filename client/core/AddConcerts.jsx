import { useState } from "react";
import { Card, Typography, Button, TextField, Rating } from "@mui/material";
import { storage } from "../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../src/AddConcert.css";

export default function AddConcerts() {
  const [concertData, setConcertData] = useState({
    name: "",
    date: null,
    venue: "",
    location: "",
    description: "",
    rating: 0,
    pic: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const [concertDate, setConcertDate] = useState(null)
  const [tempImageUpload, setTempImageUpload] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConcertData({ ...concertData, [name]: value });
  };
  const handleDateChange = (newDate) => {
    setConcertData({ ...concertData, date: newDate });
  };
  const handleRatingChange = (event, newValue) => {
    setConcertData({ ...concertData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null; // Temporary variable for the image URL

    const decodeJWT = (token) => {
      try {
        // Split the token into its three parts
        const base64Url = token.split(".")[1];
        if (!base64Url) {
          throw new Error("Invalid token format");
        }
    
        // Decode Base64Url (replace `-` and `_` to standard Base64 characters)
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join("")
        );
    
        // Parse the JSON payload and return it
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error("Error decoding token:", error.message);
        return null; // Return null if decoding fails
      }
    };

    const token = sessionStorage.getItem("jwt")
    ? JSON.parse(sessionStorage.getItem("jwt")).token
    : null;

  if (!token) {
    toast.error("You must be logged in to add a concert");
    return;
  }

  // Decode the token to extract user information
  let userId;
  try {
    const decoded = decodeJWT(token);
    userId = decoded._id; // Replace with the correct field in your token, e.g., decoded.email
  } catch (err) {
    toast.error("Invalid token");
    return;
  }
    if (imageUpload) {
      const storageRef = ref(storage, `uploads/${imageUpload.name}`);
      try {
        // Upload the image
        await uploadBytes(storageRef, imageUpload);

        // Get the download URL
        imageUrl = await getDownloadURL(storageRef);
        toast.success("Image Uploaded");
      } catch (error) {
        console.error("Error uploading file:", error);
        return; // Stop execution if upload fails
      }
    }
    try {
      const completeConcertData = { ...concertData, pic: imageUrl, createdBy: userId };
      const response = await fetch("/api/concerts", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(completeConcertData),
      });
      if (response.ok) {
        toast.success("Concert Added");
        setTempImageUpload(null);
        setConcertData({
          name: "",
          date: "",
          venue: "",
          location: "",
          description: "",
          rating: 0,
          pic: "",
        });
        navigate("/");
      } else {
        toast.error("Failed to add concert");
      }
    } catch (error) {
      // toast.error("Failed to add concert");
    }
  };
  const handleFileChange = (e) => {
    setImageUpload(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = async () => {
    if (imageUpload) {
      const storageRef = ref(storage, `uploads/${imageUpload.name}`);
      try {
        await uploadBytes(storageRef, imageUpload);
        setDownloadURL(await getDownloadURL(storageRef));
        toast.success("Image Uploaded");
      } catch (error) {
        toast.error(error);
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <div className="add-concert-page">
    <Card className="add-concert-card">
      <Typography variant="h5" className="title">Add New Concert</Typography>
      {tempImageUpload ? (
  <div className="image-container">
  <img
    src={tempImageUpload}
    alt="Temporary Upload"
    className="uploaded-image"
  />
</div>
) : (
  <div className="placeholder-image">
    <Typography variant="subtitle1" className="placeholder-text">
      No Image Uploaded
    </Typography>
  </div>
)}
      <div className="file-input-container">
        <label htmlFor="file-input" className="custom-file-input">
          Upload Concert Photo
        </label>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <form onSubmit={handleSubmit} className="concert-form">
        <TextField
          label="Concert Name"
          name="name"
          value={concertData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Concert Date"
        value={concertData.date}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
        <TextField
          label="Venue"
          name="venue"
          value={concertData.venue}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={concertData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={concertData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Rating
          name="rating"
          value={concertData.rating}
          onChange={handleRatingChange}
        />
        <div></div>
        <Button
          type="submit"
          variant="contained"
          className="add-concert-button"
        >
            Add Concert
        </Button>
      </form>
    </Card>
    </div>
  );
}
