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

export default function Builder() {
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
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", maxWidth: "1100px", margin: "auto" }}>
      <h2>Car Build Summary</h2>
      <p><strong>Selected Car:</strong> {selectedMake} {selectedModel} {selectedTrim}</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }} border="1" cellPadding="10">
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Category</th>
            <th>Selection</th>
            <th>Price</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mockPartsData).map((category) => (
            <tr key={category}>
              <td><strong>{category}</strong></td>
              <td>
                {selectedParts[category]
                  ? `${selectedParts[category].brand} ${selectedParts[category].model}`
                  : (
                    <div>
                      {mockPartsData[category].map((part, i) => (
                        <div key={i}>
                          {part.brand} {part.model} - ${part.price}
                          <button style={{ marginLeft: "8px" }} onClick={() => handleAddPart(category, part)}>
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                }
              </td>
              <td>
                {selectedParts[category] ? `$${selectedParts[category].price}` : "--"}
              </td>
              <td>
                {selectedParts[category] ? (
                  <a href={selectedParts[category].link} target="_blank" rel="noopener noreferrer">Buy</a>
                ) : "--"}
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#f9f9f9" }}>
            <td colSpan="2"><strong>Total</strong></td>
            <td colSpan="2"><strong>${totalPrice.toLocaleString()}</strong></td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#666" }}>
        * CarBuildPicker may receive compensation for purchases made at participating retailers linked on this site. This compensation does not affect what products or prices are displayed, or the order of prices listed.
      </p>
    </div>
  );
}