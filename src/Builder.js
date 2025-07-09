import React, { useState } from "react";
import { carData } from "./carData"; // Make sure this file exists and contains your car data

const partCategories = ["Suspension", "Exhaust", "Wheels", "Intake"];

const mockPartsByCategory = {
    Suspension: {
        KW: { name: "V3 Coilovers", price: 2499, link: "#" },
        Bilstein: { name: "B16 PSS10", price: 1800, link: "#" }
    },
    Exhaust: {
        Akrapovic: { name: "Titanium Slip-On", price: 3100, link: "#" },
        Remus: { name: "Sport Exhaust", price: 1450, link: "#" }
    },
    Wheels: {
        BBS: { name: "LM 18x9", price: 3400, link: "#" },
        Enkei: { name: "RPF1 17x8", price: 1200, link: "#" }
    },
    Intake: {
        Eventuri: { name: "Carbon Intake", price: 1300, link: "#" },
        AEM: { name: "Cold Air Intake", price: 450, link: "#" }
    }
};

export default function Builder() {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [trim, setTrim] = useState("");
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [selectedParts, setSelectedParts] = useState({});

    const makes = Object.keys(carData);
    const models = make ? Object.keys(carData[make].models) : [];
    const trims = make && model ? carData[make].models[model] : [];

    const handleAddPart = (category, brand) => {
        setSelectedParts(prev => ({
            ...prev,
            [category]: {
                brand,
                ...mockPartsByCategory[category][brand]
            }
        }));
    };

    const totalPrice = Object.values(selectedParts).reduce((sum, part) => sum + part.price, 0);

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "1100px", margin: "auto" }}>
            <h1 style={{ marginBottom: "1rem" }}>Car Build Picker</h1>

            {/* Car Selector */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                <select value={make} onChange={(e) => { setMake(e.target.value); setModel(""); setTrim(""); }}>
                    <option value="">Select Make</option>
                    {makes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select value={model} onChange={(e) => { setModel(e.target.value); setTrim(""); }}>
                    <option value="">Select Model</option>
                    {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select value={trim} onChange={(e) => setTrim(e.target.value)}>
                    <option value="">Select Trim</option>
                    {trims.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Parts Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }} border="1" cellPadding="10">
                <thead style={{ background: "#f0f0f0" }}>
                    <tr>
                        <th style={{ width: "20%" }}>Category</th>
                        <th>Selection</th>
                        <th style={{ width: "10%" }}>Price</th>
                        <th style={{ width: "10%" }}>Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {partCategories.map(cat => (
                        <React.Fragment key={cat}>
                            <tr>
                                <td>
                                    <button onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}>
                                        {expandedCategory === cat ? "−" : "+"}
                                    </button>{" "}
                                    {cat}
                                </td>
                                <td>
                                    {selectedParts[cat]
                                        ? `${selectedParts[cat].brand} ${selectedParts[cat].name}`
                                        : "—"}
                                    {expandedCategory === cat && (
                                        <div style={{ marginTop: "1rem" }}>
                                            {Object.keys(mockPartsByCategory[cat]).map(brand => (
                                                <div key={brand} style={{ marginBottom: "0.5rem" }}>
                                                    <strong>{brand}:</strong>{" "}
                                                    {mockPartsByCategory[cat][brand].name} – ${mockPartsByCategory[cat][brand].price}
                                                    <button
                                                        style={{ marginLeft: "1rem" }}
                                                        onClick={() => handleAddPart(cat, brand)}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td>{selectedParts[cat] ? `$${selectedParts[cat].price}` : "—"}</td>
                                <td>
                                    {selectedParts[cat] ? (
                                        <a href={selectedParts[cat].link} target="_blank" rel="noopener noreferrer">Buy</a>
                                    ) : "—"}
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}

                    <tr style={{ backgroundColor: "#f9f9f9" }}>
                        <td colSpan="2"><strong>Total</strong></td>
                        <td colSpan="2"><strong>${totalPrice.toLocaleString()}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
