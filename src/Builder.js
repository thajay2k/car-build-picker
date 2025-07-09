import React, { useState } from "react";
import { carData } from "./carData";

const partsCatalog = {
    Suspension: {
        KW: [{ model: "V3 Coilovers", price: 2499, link: "#" }],
        Bilstein: [{ model: "B16", price: 1800, link: "#" }]
    },
    Exhaust: {
        Akrapovic: [{ model: "Slip-On", price: 3000, link: "#" }],
        Remus: [{ model: "Sport Exhaust", price: 1500, link: "#" }]
    },
    Wheels: {
        BBS: [{ model: "LM 18x9", price: 3400, link: "#" }],
        Enkei: [{ model: "RPF1", price: 1200, link: "#" }]
    },
    Intake: {
        Eventuri: [{ model: "Carbon Intake", price: 1300, link: "#" }],
        AEM: [{ model: "Cold Air", price: 450, link: "#" }]
    }
};

export default function Builder() {
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedTrim, setSelectedTrim] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedBrands, setExpandedBrands] = useState({});
    const [selectedParts, setSelectedParts] = useState({});

    const makes = Object.keys(carData);
    const models = selectedMake ? Object.keys(carData[selectedMake].models) : [];
    const trims = selectedMake && selectedModel ? carData[selectedMake].models[selectedModel] : [];
    // For year, assuming carData includes years; if not, add a default range
    const years = selectedMake && selectedModel && selectedTrim
        ? carData[selectedMake].years?.[selectedModel]?.[selectedTrim] || []
        : [];

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const toggleBrand = (category, brand) => {
        setExpandedBrands((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [brand]: !prev[category]?.[brand]
            }
        }));
    };

    const handleAddPart = (category, brand, part) => {
        setSelectedParts((prev) => ({
            ...prev,
            [category]: { brand, ...part }
        }));
    };

    const totalPrice = Object.values(selectedParts).reduce((acc, part) => acc + part.price, 0);

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
            <aside style={{ width: 300, padding: 20, borderRight: "1px solid #ccc", overflowY: "auto" }}>
                <h3>Select Your Car</h3>
                <label>
                    Make:
                    <select
                        value={selectedMake}
                        onChange={(e) => {
                            setSelectedMake(e.target.value);
                            setSelectedModel("");
                            setSelectedTrim("");
                            setSelectedYear("");
                            setSelectedParts({});
                        }}
                        style={{ width: "100%", marginTop: 5 }}
                    >
                        <option value="">-- Select Make --</option>
                        {makes.map((make) => (
                            <option key={make} value={make}>{make}</option>
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
                            setSelectedYear("");
                            setSelectedParts({});
                        }}
                        disabled={!selectedMake}
                        style={{ width: "100%", marginTop: 5 }}
                    >
                        <option value="">-- Select Model --</option>
                        {models.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                </label>
                <br /><br />
                <label>
                    Trim:
                    <select
                        value={selectedTrim}
                        onChange={(e) => {
                            setSelectedTrim(e.target.value);
                            setSelectedYear("");
                            setSelectedParts({});
                        }}
                        disabled={!selectedModel}
                        style={{ width: "100%", marginTop: 5 }}
                    >
                        <option value="">-- Select Trim --</option>
                        {trims.map((trim) => (
                            <option key={trim} value={trim}>{trim}</option>
                        ))}
                    </select>
                </label>
                <br /><br />
                <label>
                    Year:
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        disabled={!selectedTrim}
                        style={{ width: "100%", marginTop: 5 }}
                    >
                        <option value="">-- Select Year --</option>
                        {(years.length > 0
                            ? years
                            : Array.from({ length: 30 }, (_, i) => `${1990 + i}`) // default 1990-2019
                        ).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
                <br /><br />
                {selectedMake && selectedModel && selectedTrim && selectedYear && (
                    <div>
                        <strong>Selected Car:</strong>
                        <p>{selectedMake} {selectedModel} {selectedTrim} ({selectedYear})</p>
                    </div>
                )}
            </aside>

            <main style={{ flex: 1, padding: 20, overflowY: "auto" }}>
                <h2>Parts Catalog</h2>
                {Object.entries(partsCatalog).map(([category, brands]) => (
                    <div key={category} style={{ marginBottom: 20 }}>
                        <h3 style={{ cursor: "pointer" }} onClick={() => toggleCategory(category)}>
                            {expandedCategories[category] ? "− " : "+ "} {category}
                        </h3>
                        {expandedCategories[category] &&
                            Object.entries(brands).map(([brand, parts]) => (
                                <div key={brand} style={{ marginLeft: 20, marginBottom: 10 }}>
                                    <h4 style={{ cursor: "pointer" }} onClick={() => toggleBrand(category, brand)}>
                                        {expandedBrands[category]?.[brand] ? "− " : "+ "} {brand}
                                    </h4>
                                    {expandedBrands[category]?.[brand] &&
                                        parts.map((part, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    marginLeft: 20,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: 5
                                                }}
                                            >
                                                <span>{part.model} — ${part.price}</span>
                                                <button onClick={() => handleAddPart(category, brand, part)}>
                                                    Add
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                ))}

                <hr />

                <h2>Build Summary</h2>
                {Object.keys(selectedParts).length === 0 ? (
                    <p>No parts selected.</p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #ccc" }}>
                                <th style={{ textAlign: "left", padding: "8px" }}>Category</th>
                                <th style={{ textAlign: "left", padding: "8px" }}>Brand</th>
                                <th style={{ textAlign: "left", padding: "8px" }}>Model</th>
                                <th style={{ textAlign: "right", padding: "8px" }}>Price</th>
                                <th style={{ textAlign: "center", padding: "8px" }}>Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(selectedParts).map(([category, part]) => (
                                <tr key={category} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "8px" }}>{category}</td>
                                    <td style={{ padding: "8px" }}>{part.brand}</td>
                                    <td style={{ padding: "8px" }}>{part.model}</td>
                                    <td style={{ padding: "8px", textAlign: "right" }}>${part.price}</td>
                                    <td style={{ padding: "8px", textAlign: "center" }}>
                                        <a href={part.link} target="_blank" rel="noopener noreferrer">Buy</a>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3} style={{ padding: "8px", textAlign: "right", fontWeight: "bold" }}>
                                    Total:
                                </td>
                                <td style={{ padding: "8px", fontWeight: "bold", textAlign: "right" }}>
                                    ${totalPrice.toLocaleString()}
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <p style={{ marginTop: 20, fontSize: 12, color: "#666" }}>
                    * CarBuildPicker may receive compensation for purchases made at participating retailers linked on this site.
                    This compensat
