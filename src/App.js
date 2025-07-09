import React, { useState } from "react";
import { carData } from "./carData";

export default function App() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");

  const makes = Object.keys(carData);
  const models = selectedMake ? Object.keys(carData[selectedMake].models) : [];
  const trims = selectedMake && selectedModel ? carData[selectedMake].models[selectedModel] : [];

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Car Build Picker</h1>

      <label>
        Make:
        <select
          value={selectedMake}
          onChange={(e) => {
            setSelectedMake(e.target.value);
            setSelectedModel("");
            setSelectedTrim("");
          }}
        >
          <option value="">-- Select Make --</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Model:
        <select
          value={selectedModel}
          onChange={(e) => {
            setSelectedModel(e.target.value);
            setSelectedTrim("");
          }}
          disabled={!selectedMake}
        >
          <option value="">-- Select Model --</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Trim:
        <select
          value={selectedTrim}
          onChange={(e) => setSelectedTrim(e.target.value)}
          disabled={!selectedModel}
        >
          <option value="">-- Select Trim --</option>
          {trims.map((trim) => (
            <option key={trim} value={trim}>
              {trim}
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      {selectedMake && selectedModel && selectedTrim && (
        <div>
          <h2>Your Build:</h2>
          <p>
            <strong>Make:</strong> {selectedMake}<br />
            <strong>Model:</strong> {selectedModel}<br />
            <strong>Trim:</strong> {selectedTrim}
          </p>
          <p>Parts and pricing coming soon...</p>
        </div>
      )}
    </div>
  );
}