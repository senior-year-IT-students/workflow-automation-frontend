import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Workflow Automation Dashboard</h1>
      <p>Welcome to your React + TypeScript application.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button>Submit</button>
      </div>

      {name && (
        <p style={{ marginTop: "1rem" }}>
          Hello, <strong>{name}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
