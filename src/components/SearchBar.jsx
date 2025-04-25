import React, { useState } from "react";

export default function SearchBar({ doctors, setSearchParams }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = e => {
    const val = e.target.value;
    setInput(val);

    if (val.length > 0) {
      const filtered = doctors
        .filter(doc => doc.name.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 3);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = name => {
    setInput(name);
    setSearchParams(params => {
      params.set("search", name);
      return params;
    });
    setSuggestions([]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams(params => {
      params.set("search", input);
      return params;
    });
    setSuggestions([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="autocomplete-input"
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search doctor..."
        />
      </form>
      {suggestions.map((doc, i) => (
        <div key={i} data-testid="suggestion-item" onClick={() => handleSelect(doc.name)}>
          {doc.name}
        </div>
      ))}
    </div>
  );
}
