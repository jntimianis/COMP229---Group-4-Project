import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function AddConcerts() {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>Track your concerts and all the good memories that come with!</Typography>
        </Card>
    )
}