import { useState, useEffect } from "react";
import "./Input.css";
import PropTypes from "prop-types";

export const Input = ({ setThoughts }) => {
  const URL = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  const [userInput, setUserInput] = useState("");

  const handleUserInput = async (event) => {
    event.preventDefault();

    if (!userInput.trim()) {
      console.error("No user Imput!");
      alert("Please add you happy thought before submitting!");
      return;
    }

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        message: userInput,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("Network is bad. Please reload the Page.");
        }
        return result.json();
      })
      .then((newData) => {
        setThoughts((previousData) => [newData, ...previousData]);
        setUserInput("");
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
      });
  };

  useEffect(() => {
    handleUserInput();
  }, []);

  return (
    <div>
      <form className="input-box">
        What is making you happy right now?
        <input
          className="input-field"
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          placeholder="Your happy thought!"
        />
        <button
          className="button-input"
          type="submit"
          onClick={handleUserInput}
        >
          Send Happy Thought
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  thoughts: PropTypes.any,
  setThoughts: PropTypes.any,
};
