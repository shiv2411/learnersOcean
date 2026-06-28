import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const users = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Priya Mehta" },
  { id: 3, name: "Aman Verma" },
  { id: 4, name: "Neha Singh" },
  { id: 5, name: "Karan Gupta" },
  { id: 6, name: "Rohit Agarwal" },
];

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const searchText = inputValue.trim().toLowerCase();

    if (!searchText) {
      setSuggestions([]);
      setIsOpen(false);
      setActiveIndex(-1);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timerId = setTimeout(() => {
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText)
      );

      setSuggestions(filteredUsers);
      setIsOpen(true);
      setActiveIndex(-1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timerId);
  }, [inputValue]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (user) => {
    setInputValue(user.name);
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (!isOpen || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev === suggestions.length - 1 ? 0 : prev + 1
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex]);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const showDropdown =
    isOpen && (loading || suggestions.length > 0 || inputValue.trim());

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <label className="label">Search User</label>

      <input
        className="input"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type user name..."
      />

      {showDropdown && (
        <ul className="dropdown">
          {loading && <li className="item muted">Loading...</li>}

          {!loading &&
            suggestions.map((user, index) => (
              <li
                key={user.id}
                className={`item ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseDown={() => handleSelect(user)}
              >
                {user.name}
              </li>
            ))}

          {!loading && suggestions.length === 0 && (
            <li className="item muted">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;