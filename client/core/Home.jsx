import { useState, useEffect } from "react";
import axios from "axios";
import "../src/index.css";
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
} from "@mui/material";
import ConfirmationModal from "./ConfirmationModal.jsx";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null); // For storing the concert to edit
  const [openEditModal, setOpenEditModal] = useState(false); // For controlling edit modal visibility
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // For controlling delete modal visibility
  const navigate = useNavigate();

  // Fetch concerts from the backend
  useEffect(() => {
    const token = sessionStorage.getItem("jwt")
      ? JSON.parse(sessionStorage.getItem("jwt")).token
      : null;
    console.log("JWT Get Token:", token); // Log the token for debugging
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/concerts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          withCredentials: true,
        });
        setConcerts(response.data);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

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

    try {
      const response = await axios.put(
        `http://localhost:3000/api/concerts/${selectedConcert._id}`,
        selectedConcert,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Update response:", response);
      setConcerts(
        concerts.map((c) =>
          c._id === selectedConcert._id ? selectedConcert : c
        )
      );
      setOpenEditModal(false); // Close edit modal
    } catch (error) {
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

      await axios.delete(
        `http://localhost:3000/api/concerts/${selectedConcert._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Remove the deleted concert from the local state
      setConcerts(concerts.filter((c) => c._id !== selectedConcert._id));
      setOpenDeleteModal(false); // Close the delete modal
      setSelectedConcert(null); // Reset selected concert
    } catch (error) {
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

  return (
    <div>
      <Card className="card">
        <Typography variant="h6" className="title">
          Track your concerts and all the good memories that come with!
        </Typography>
      </Card>

      <div className="container">
        <button className="add-button" onClick={() => navigate("/addconcerts")}>
          + Add New Concert
        </button>

        {concerts.map((concert) => (
          <Card key={concert._id} className="card">
            <img
              src={concert.imageUrl || "path/to/placeholder.jpg"}
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
