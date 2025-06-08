import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

export default function TaskForm({token, onUpdate}) {
  const [title,setTitle]=useState("");
  const add = async () => {
    if(!title.trim()) return;
    await axios.post(`${process.env.REACT_APP_API_URL}/tasks`,{title},{headers:{Authorization:`Bearer ${token}`}});
    setTitle("");
    onUpdate();
  }

  return (
    <Box display="flex" my={2}>
      <TextField label="New Task" value={title} onChange={e=>setTitle(e.target.value)} fullWidth/>
      <Button variant="contained" onClick={add} sx={{ml:1}}>Add</Button>
    </Box>
  );
}
