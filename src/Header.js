// src/Header.js
import React from "react";
import { useAuth } from "./AuthContext";

export default function Header({ onPageChange }) {
  const { user, signOut } = useAuth();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#eee" }}>
      <h1 style={{ cursor: "pointer" }} onClick={() => onPageChange("builder")}>ModPicker</h1>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button style={{ marginLeft: "1rem" }} onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => onPageChange("signin")}>Sign In</button>
        )}
      </div>
    </div>
  );
}
