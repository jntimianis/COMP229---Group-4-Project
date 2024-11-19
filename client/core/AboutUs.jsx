import { Card, Typography } from "@mui/material";
import TeamLogo from "../assets/images/team-logo.jpg";

export default function AboutUs() {
    return (
        <Card style={{ padding: "20px", margin: "20px" }}>
            <Typography variant="h6" className="title">About Us</Typography>
              <img
                src={TeamLogo}
                className="aboutus-img"
                alt="Team Logo"
                style={{ width: "300px", height: "auto", borderRadius: "8px", marginBottom: "20px" }}
              />
            <Typography variant="body1" className="aboutus-text">
              We are the Web Masters and we bring you Concert Compass, an app for avid
              concert goers. We are a new team of developers looking to help you organize
              your favourite concerts all in one place. Concert Compass does just that! Upload
              your best pictures and let the good times live on.
            </Typography>
            <Typography variant="body1" className="aboutus-text">
              If you have any questions, feel free to reach out to us. We're here to help!
            </Typography>
        </Card>
    );
}