import React, { useState } from "react";
import { carData } from "./carData";

const mockParts = {
  Suspension: { name: "KW V3 Coilovers", price: 2499, link: "#" },
  Wheels: { name: "BBS LM 18x9", price: 3400, link: "#" },
  Exhaust: { name: "Akrapovic Exhaust", price: 3000, link: "#" },
  Intake: { name: "Eventuri Intake", price: 1300, link: "#" }
};

export default function App() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");

  const makes = Object.keys(carData);
  const models = selectedMake ? Object.keys(carData[selectedMake].models) : [];
  const trims =
    selectedMake && selectedModel
      ? carData[selectedMake].models[selectedModel]
      : [];

  const selectedParts = Object.entries(mockParts);
  const totalPrice = selectedParts.reduce((acc, [, part]) => acc + part.price, 0);

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Car Build Picker</h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ flex: 1 }}>
          <h2>1. Select Your Car</h2>
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
              <h3>Selected Car</h3>
              <p>
                {selectedModel} - {selectedTrim}<br />
                <strong>{selectedMake}</strong>
              </p>
            </div>
          )}
        </div>

        <div style={{ flex: 2 }}>
          <h2>2. Parts Picker</h2>
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Part</th>
                <th>Price</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {selectedParts.map(([category, part]) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{part.name}</td>
                  <td>${part.price.toLocaleString()}</td>
                  <td><a href={part.link} target="_blank" rel="noreferrer">Buy</a></td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total</strong></td>
                <td colSpan="2"><strong>${totalPrice.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}