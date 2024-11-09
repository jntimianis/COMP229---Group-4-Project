import React, { useState } from 'react';
import { Card, Typography, TextField, Button } from '@material-ui/core';

export default function AddConcerts() {
    const [concertData, setConcertData] = useState({
        name: '',
        date: '',
        venue: '',
        location: '',
        description: '',
        rating: 0
    });
    const [feedback, setFeedback] = useState('');    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConcertData({ ...concertData, [name]: value });
    };

    const handleRatingChange = (event, newValue) => {
        setConcertData({ ...concertData, rating: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/concerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(concertData)
            });
            if (response.ok) {
                setFeedback('Concert added successfully!');
                setConcertData({ name: '', date: '', venue: '', location: '', description: '' });
            } else {
                toast.error('Failed to add concert')
            }
        } catch (error) {
            toast.error('Failed to add concert')
        }
    };

    return (
        <Card style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h6">Add a New Concert</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Concert Name"
                    name="name"
                    value={concertData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    value={concertData.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
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
                <Button type="submit" color="primary" variant="contained">
                    Add Concert
                </Button>
            </form>
            {feedback && <Typography color="error">{feedback}</Typography>}
        </Card>
    );
}