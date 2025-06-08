import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { Box, Button, Container, Typography, List } from "@mui/material";
import TaskForm from "./TaskForm";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default function Dashboard() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    if (!token) return;
    const res = await API.get("/tasks", { headers:{Authorization: `Bearer ${token}` }});
    setTasks(res.data);
  };

  const handleLogin = token => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  useEffect(loadTasks, [token]);

  return (
    <Container sx={{ mt: 4 }}>
      {!token ? (
        <Box textAlign="center">
          <Typography>Login with Google to continue:</Typography>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={res => handleLogin(res.tokenId)}
            onFailure={console.error}
          />
        </Box>
      ) : (
        <Box>
          <Typography>Your Tasks</Typography>
          <TaskForm token={token} onUpdate={loadTasks} />
          <List>{tasks.map(t => (
            <Box key={t._id}>{t.title}</Box>
          ))}</List>
          <Button onClick={() => { localStorage.clear(); setToken(null); }}>Logout</Button>
        </Box>
      )}
    </Container>
  );
}
