import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from "./Builder";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Builder />} />
            </Routes>
        </Router>
    );
}
