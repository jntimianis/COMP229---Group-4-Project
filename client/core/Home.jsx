/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import "../src/index.css";
import "../src/Home.css";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Rating,
  Box,
} from "@mui/material";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { storage } from "../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null); // For storing the concert to edit
  const [openEditModal, setOpenEditModal] = useState(false); // For controlling edit modal visibility
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // For controlling delete modal visibility
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [tempImageUpload, setTempImageUpload] = useState(null);
  const [sortOption, setSortOption] = useState("default"); // default, name, date, rating

  const [downloadURL, setDownloadURL] = useState(null);
  // Fetch concerts from the backend
  useEffect(() => {
    const token = sessionStorage.getItem("jwt")
      ? JSON.parse(sessionStorage.getItem("jwt")).token
      : null;
    console.log("JWT Get Token:", token); // Log the token for debugging
    const fetchConcerts = async () => {
      const decodeJWT = (token) => {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
              .join("")
          );
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error("Error decoding token:", error);
          return null;
        }
      };

      const decodedToken = decodeJWT(token);
      if (!decodedToken || !decodedToken._id) {
        toast.error("Invalid user authentication.");
        return;
      }
      const userId = decodedToken._id;

      try {
        const response = await axios.get("/api/concerts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          withCredentials: true,
        });
        const allConcerts = response.data;

        // Filter concerts created by the logged-in user
        const userConcerts = allConcerts.filter(
          (concert) => concert.createdBy === userId
        );

        setConcerts(userConcerts);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

  const sortedConcerts = [...concerts].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name); // Alphabetical order
    } else if (sortOption === "date") {
      return new Date(a.date) - new Date(b.date); // Oldest to newest
    } else if (sortOption === "rating") {
      return b.rating - a.rating; // Highest rating first
    } else {
      return 0; // Default order
    }
  });
  // Function to open the edit modal and load selected concert data
  const handleEditClick = (concert) => {
    setSelectedConcert(concert); // Set selected concert for editing
    setOpenEditModal(true); // Open edit modal
  };

  // Function to handle updating concert details
  const handleUpdateConcert = async () => {
    const token = sessionStorage.getItem("jwt")
      ? JSON.parse(sessionStorage.getItem("jwt")).token
      : null;

    if (!token) {
      console.log("User is not authenticated. Redirecting to login...");
      return;
    }

    let imageUrl = null; // Temporary variable for the image URL

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
      // Ensure imageUrl is used if available
      const completeConcertData = {
        ...selectedConcert,
        pic: imageUrl || selectedConcert.pic, // Use the existing pic if no new image is uploaded
      };

      // Make the API request
      const response = await axios.put(
        `/api/concerts/${completeConcertData._id}`,
        completeConcertData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Update response:", response);

      // Update the state
      setConcerts(
        concerts.map((c) =>
          c._id === selectedConcert._id ? completeConcertData : c
        )
      );
      toast.success("Concert updated successfully!");
      setTempImageUpload(null);

      setOpenEditModal(false); // Close edit modal
    } catch (error) {
      toast.error("Error updating concert.");
      console.error("Error updating concert:", error);
    }
  };

  // Function to handle changes in the edit modal form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedConcert((prevConcert) => ({ ...prevConcert, [name]: value }));
    console.log("Updated selectedConcert:", selectedConcert);
  };

  // Function to open the delete confirmation modal
  const handleDeleteClick = (concert) => {
    setSelectedConcert(concert);
    setOpenDeleteModal(true); // Open the delete confirmation modal
  };

  // Function to handle the confirmation of the delete action
  const handleConfirmDelete = async () => {
    try {
      const token = sessionStorage.getItem("jwt")
        ? JSON.parse(sessionStorage.getItem("jwt")).token
        : null;

      if (!token) {
        console.log("User is not authenticated. Redirecting to login...");
        return;
      }

      await axios.delete(`/api/concerts/${selectedConcert._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Remove the deleted concert from the local state
      setConcerts(concerts.filter((c) => c._id !== selectedConcert._id));
      toast.success("Concert deleted successfully!");
      setOpenDeleteModal(false); // Close the delete modal
      setSelectedConcert(null); // Reset selected concert
    } catch (error) {
      toast.error("Error deleting concert.");
      console.error("Error deleting concert:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedConcert(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedConcert(null);
  };
  const handleRatingChange = (event, newValue) => {
    setSelectedConcert((prevConcert) => ({ ...prevConcert, rating: newValue }));
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
  return (
    <div>
      <Card className="card">
        <Typography variant="h6" className="title">
          Track your concerts and all the good memories that come with!
        </Typography>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "20px",
        }}
      ></Box>
      <TextField
        select
        label="Sort By"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        SelectProps={{ native: true }}
        variant="outlined"
        sx={{
          minWidth: "200px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": {
              borderColor: "#3f51b5",
            },
          },
        }}
      >
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="rating">Rating</option>
      </TextField>
      <div className="container">
        <button className="add-button" onClick={() => navigate("/addconcerts")}>
          + Add New Concert
        </button>
        {sortedConcerts.map((concert) => (
          <Card key={concert._id} className="card">
            <img
              src={concert.pic || "path/to/placeholder.jpg"}
              alt={concert.name}
            />
            <CardContent>
              <Typography variant="h6" className="title">
                {concert.name}
              </Typography>
              <Typography variant="body2" className="date">
                <span className="bold">Date: </span> {concert.date}
              </Typography>
              <Typography variant="body2" className="venue">
                <span className="bold">Venue: </span> {concert.venue}
              </Typography>
              <Typography variant="body2" className="location">
                <span className="bold">Location:</span> {concert.location}
              </Typography>
              <Typography variant="body2" className="description">
                <span className="bold">Description: </span>{" "}
                {concert.description}
              </Typography>
              <Rating
                name={`rating-${concert._id}`}
                value={concert.rating || 0}
                readOnly
              />
            </CardContent>
            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => handleEditClick(concert)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(concert)}
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Edit Concert Modal */}
      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Concert</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={selectedConcert?.name || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          {tempImageUpload ? (
            <img
              src={tempImageUpload}
              alt="Temporary Upload"
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
          ) : selectedConcert?.pic ? (
            <img
              src={selectedConcert.pic}
              alt="Concert"
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
          ) : (
            <p>No image available</p>
          )}
          <input type="file" onChange={handleFileChange} />
          <TextField
            label="Date"
            name="date"
            value={selectedConcert?.date || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Venue"
            name="venue"
            value={selectedConcert?.venue || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Location"
            name="location"
            value={selectedConcert?.location || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Description"
            name="description"
            value={selectedConcert?.description || ""}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
            multiline
            rows={4}
          />
          <Rating
            name="rating"
            value={selectedConcert?.rating || 0}
            onChange={handleRatingChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateConcert}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
