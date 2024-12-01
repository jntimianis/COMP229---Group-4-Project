import { Card, Typography, Grid, Avatar, Box } from "@mui/material";
import TeamLogo from "../assets/images/team-logo.jpg";
import Sam from "../assets/images/Sam.png";
import Jordan from "../assets/images/Jordan.png";
import Tim from "../assets/images/Tim.png";
import Mauli from "../assets/images/Mauli.png";
import Sabra from "../assets/images/Sabra.png";
import Tarikul from "../assets/images/Tarikul.png";

const teamMembers = [
  {
    name: "Mauli Gandhi",
    image: Mauli
  },
  {
    name: "Jordan Timianis",
    image: Jordan
  },
  {
    name: "Tim Conway",
    image: Tim
  },
  {
    name: "Samantha Danielle Reyes",
    image: Sam
  },

  {
    name: "Sabra Elhajjaji",
    image: Sabra
  },
  {
    name: "Tarikul Khan",
    image: Tarikul
  }
];

export default function AboutUs() {
  return (
    <Card style={{ padding: "20px", margin: "20px", backgroundColor: "#EFF6E0" }}>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: "20px", color: "#01161E", fontWeight: "bold" }}
      >
        About Us
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        <img
          src={TeamLogo}
          alt="Team Logo"
          style={{ width: "200px", height: "auto", borderRadius: "8px" }}
        />
      </Box>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: "20px", color: "#124559" }}
      >
        We are the Web Masters and we bring you Concert Compass, an app for avid concert-goers. Our team of developers is dedicated to
        helping you organize your favorite concerts all in one place. With Concert Compass, you can easily upload your best pictures,
        add details, and keep the good memories alive.
      </Typography>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: "40px", color: "#124559" }}
      >
        If you have any questions, feel free to reach out to us. We are here to help and ensure you have the best experience possible!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ padding: "20px", backgroundColor: "#598392" }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt={member.name}
                  src={member.image}
                  style={{ width: "150px", height: "150px", marginBottom: "20px" }}
                />
                <Typography variant="h6" style={{ color: "#01161E", fontWeight: "bold" }}>
                  {member.name}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}