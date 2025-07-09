import React, { useState } from "react";
import { carData } from "./carData";

const mockPartsData = {
  Suspension: [
    { brand: "KW", model: "V3 Coilovers", price: 2499, link: "#" },
    { brand: "Bilstein", model: "B16", price: 1800, link: "#" }
  ],
  Exhaust: [
    { brand: "Akrapovic", model: "Slip-On", price: 3000, link: "#" },
    { brand: "Remus", model: "Sport Exhaust", price: 1500, link: "#" }
  ],
  Wheels: [
    { brand: "BBS", model: "LM 18x9", price: 3400, link: "#" },
    { brand: "Enkei", model: "RPF1", price: 1200, link: "#" }
  ],
  Intake: [
    { brand: "Eventuri", model: "Carbon Intake", price: 1300, link: "#" },
    { brand: "AEM", model: "Cold Air", price: 450, link: "#" }
  ]
};

export default function App() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedParts, setSelectedParts] = useState({});

  const makes = Object.keys(carData);
  const models = selectedMake ? Object.keys(carData[selectedMake].models) : [];
  const trims = selectedMake && selectedModel ? carData[selectedMake].models[selectedModel] : [];

  const handleAddPart = (category, part) => {
    setSelectedParts((prev) => ({ ...prev, [category]: part }));
  };

  const totalPrice = Object.values(selectedParts).reduce((acc, part) => acc + part.price, 0);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "250px", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h3>Select Your Car</h3>
        <label>
          Make:
          <select
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              setSelectedModel("");
              setSelectedTrim("");
              setSelectedParts({});
            }}
            style={{ width: "100%" }}
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
              setSelectedParts({});
            }}
            disabled={!selectedMake}
            style={{ width: "100%" }}
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
            style={{ width: "100%" }}
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
            <strong>Selected Car:</strong>
            <p>{selectedMake} {selectedModel} - {selectedTrim}</p>
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: "2rem" }}>
        <h2>Parts Picker</h2>
        {Object.entries(mockPartsData).map(([category, parts]) => (
          <div key={category} style={{ marginBottom: "1.5rem" }}>
            <h4>{category}</h4>
            {parts.map((part, index) => (
              <div key={index} style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{part.brand} {part.model} — ${part.price}</span>
                <button onClick={() => handleAddPart(category, part)}>Add</button>
              </div>
            ))}
          </div>
        ))}

        <hr />
        <h3>Build Summary</h3>
        {Object.keys(selectedParts).length === 0 && <p>No parts selected.</p>}
        {Object.entries(selectedParts).map(([category, part]) => (
          <div key={category}>
            <strong>{category}:</strong> {part.brand} {part.model} — ${part.price} → <a href={part.link} target="_blank">Buy</a>
          </div>
        ))}
        <h4>Total: ${totalPrice.toLocaleString()}</h4>
      </div>
    </div>
  );
}