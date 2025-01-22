import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { Home, Apps, Storage, NetworkCheck, Dns, Router, Memory } from "@mui/icons-material";

const Dashboard = () => {
  const navigate = useNavigate();

  // Structure des cartes avec des icônes
  const cards = [
    { id: 1, title: "Category Serveur", route: "/CategoryServeur", icon: <Storage />, color: "#2196F3" },
    { id: 2, title: "Category Application", route: "/CategoryApplication", icon: <Apps />, color: "#4CAF50" },
    { id: 3, title: "Site", route: "/site",icon: <Home />, color: "#2196F3" },
    { id: 4, title: "Application", route: "/application", icon: <Apps />, color: "#4CAF50" },
    { id: 5, title: "Cluster Application", route: "/clusterApplication", icon: <Memory />, color: "#2196F3" },
    { id: 6, title: "Cluster", route: "/cluster", icon: <Dns />, color: "#4CAF50" },
    { id: 7, title: "Serveur Application", route: "/ServeurApplication", icon: <Storage />, color: "#2196F3" },
    { id: 8, title: "Serveur", route: "/Serveur",  icon: <Dns />, color: "#4CAF50" },
    { id: 9, title: "Sous Reseau", route: "/SousReseau", icon: <Router />, color: "#2196F3" },
    { id: 10, title: "Reseau", route: "/Reseau",icon: <NetworkCheck />, color: "#4CAF50" },
  ];

  // Fonction pour gérer le clic sur une carte
  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card
              onClick={() => handleCardClick(card.route)}
              sx={{
                cursor: "pointer",
                boxShadow: 3,
                "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                transition: "all 0.3s ease",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                {/* Icon Circle */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    margin: "0 auto",
                    borderRadius: "50%",
                    backgroundColor: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </Box>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.country}
                </Typography>
                {/* <Typography variant="caption" color="text.secondary">
                  Voir la liste
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
