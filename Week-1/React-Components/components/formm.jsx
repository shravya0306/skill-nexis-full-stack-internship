import { useState } from "react";

function Formm() {
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Enter Your Name</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Hello, {name}</p>
    </div>
  );
}

export default Formm;