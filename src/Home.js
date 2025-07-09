import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Build Your Car</h1>
      <p>Welcome to Car Build Picker — the ultimate tool for customizing your car just like you would build a PC.</p>
      <ul>
        <li>Select your car by make, model, trim, and year.</li>
        <li>Add mods from categories like Suspension, Exhaust, Wheels, and more.</li>
        <li>See live prices and buy from trusted retailers using affiliate links.</li>
        <li>Track your total build cost and modify your setup easily.</li>
      </ul>
      <Link to="/build">
        <button style={{ padding: "0.5rem 1rem", fontSize: "16px" }}>Start Building</button>
      </Link>
    </div>
  );
}