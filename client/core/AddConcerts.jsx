import React, { useState } from 'react';
import { Card, Typography, TextField, Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddConcerts() {
    const [concertData, setConcertData] = useState({
        name: '',
        date: '',
        venue: '',
        location: '',
        description: ''
    });
    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConcertData({ ...concertData, [name]: value });
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
                toast.success('Concert added successfully!');
                setConcertData({ name: '', date: '', venue: '', location: '', description: '' });
                setFeedback('');
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
                <Button type="submit" color="primary" variant="contained">
                    Add Concert
                </Button>
            </form>
            {feedback && <Typography color="error">{feedback}</Typography>}
        </Card>
    );
}