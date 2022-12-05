import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Box } from "@mui/material";
import RoutineDetails from "./pages/RoutineDetails";

function App() {
    return (
        <Box p={2}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:routineId" element={<RoutineDetails />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Box>
    );
}

export default App;
