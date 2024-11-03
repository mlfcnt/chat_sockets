"use client";

import React, { useState } from "react";
import "./Chat.css"; // Import the CSS styles

const UsernameForm = () => {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username) {
      localStorage.setItem("username", username);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="username-form">
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">Set Username</button>
    </form>
  );
};

export default UsernameForm;
