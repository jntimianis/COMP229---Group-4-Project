import React from 'react';
import '../src/index.css';
import concert1 from '../src/assets/concert1.jpg'
import concert2 from '../src/assets/concert2.jpg'
import concert3 from '../src/assets/concert3.jpg'
import concert4 from '../src/assets/concert4.jpg'
import concert5 from '../src/assets/concert5.jpg'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Sample concert data
const concerts = [
    {
        id: 1,
        name: 'Concert A',
        date: 'November 1st, 2024',
        venue: 'Venue A',
        location: 'Location A',
        description: 'This was an amazing concert!',
        imageUrl: concert1, // Replace with actual image URL
    },
    {
        id: 2,
        name: 'Concert B',
        date: 'November 23rd, 2024',
        venue: 'Venue B',
        location: 'Location B',
        description: 'Had a wonderful time at this concert!',
        imageUrl: concert2, // Replace with actual image URL
    },
    {
        id: 3,
        name: 'Concert C',
        date: 'December 5th, 2024',
        venue: 'Venue C',
        location: 'Location C',
        description: 'An unforgettable experience!',
        imageUrl: concert3, // Replace with actual image URL
    },
    {
        id: 4,
        name: 'Concert D',
        date: 'December 18th, 2024',
        venue: 'Venue D',
        location: 'Location D',
        description: 'Such a great time!',
        imageUrl: concert4, // Replace with actual image URL
    },
    {
        id: 5,
        name: 'Concert E',
        date: 'January 10th, 2025',
        venue: 'Venue E',
        location: 'Location E',
        description: 'Such a great time!',
        imageUrl: concert5, // Replace with actual image URL
    },
    // Add more concerts as needed
];

export default function Home() {
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
                onClick={() => console.log("Add New Concert clicked")}
            >
                + Add New Concert
            </button>

            {/* Loop through concerts and display each as a card */}
            {concerts.map(concert => (
                <Card key={concert.id} className="card">
                    <img src={concert.imageUrl} alt={concert.name} />
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
                            <span className="bold">Description: </span> {concert.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
        </div>
    );
}


