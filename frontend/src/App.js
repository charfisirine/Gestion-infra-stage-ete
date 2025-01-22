import React from "react";
import "./App.css";
// import Home from './Components/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryServeur from "./Components/CategoryServeur/CategoryServeur";
import CategoryApplication from "./Components/CategoryApplication/CategoryApplication";
import Site from "./Components/Site/Site";
import Application from "./Components/Application/Application";
import ClusterApplication from "./Components/ClusterApplication/ClusterApplication";
import Cluster from "./Components/Cluster/Cluster";
import ServeurApplication from "./Components/ServeurApplication/ServeurApplication";

import Navbar from "./Components/Navbar/Navbar";
import Serveur from "./Components/Serveur/Serveur";
import SousReseau from "./Components/SousReseau/SousReseau";
import Reseau from "./Components/Reseau/Reseau";
import SignIn from "./Components/Authentification/SignIn";
import SignUp from "./Components/Authentification/SignUp";
import ProtectedRoute from "./Protected-Route";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CategoryServeur"
          element={
            <ProtectedRoute>
              <CategoryServeur />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CategoryApplication"
          element={
            <ProtectedRoute>
              <CategoryApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/site"
          element={
            <ProtectedRoute>
              <Site />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application"
          element={
            <ProtectedRoute>
              <Application />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clusterApplication"
          element={
            <ProtectedRoute>
              <ClusterApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cluster"
          element={
            <ProtectedRoute>
              <Cluster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ServeurApplication"
          element={
            <ProtectedRoute>
              <ServeurApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Serveur"
          element={
            <ProtectedRoute>
              <Serveur />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SousReseau"
          element={
            <ProtectedRoute>
              <SousReseau />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Reseau"
          element={
            <ProtectedRoute>
              <Reseau />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
