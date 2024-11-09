import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/index.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null); // For storing the concert to edit
  const [openModal, setOpenModal] = useState(false); // For controlling modal visibility
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
  const handleChange = () => {};
  const handleRatingChange = () => {};
  const handleUpdateConcert = () => {};

  return (
    <div>
      <Card className="card">
        <Typography variant="h6" className="title">
          Track your concerts and all the good memories that come with!
        </Typography>
      </Card>

      <div className="container">
        {/* Add Concert Button */}
        <button
          className="add-button"
          onClick={() => navigate("/addconcerts")} // Navigate to the form
        >
          + Add New Concert
        </button>

        {/* Loop through concerts and display each as a card */}
        {concerts.map((concert) => (
          <Card key={concert._id} className="card">
            {/* Use a placeholder image or a static image for now */}
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
                onChange={(event, newValue) => handleRatingChange(newValue)}
              />
            </CardContent>
            {/* Button container */}
            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => console.log(`Edit concert ${concert._id}`)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => console.log(`Delete concert ${concert._id}`)}
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
      {/* Edit Concert Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
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
            onChange={(e, newValue) => handleRatingChange(newValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
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
