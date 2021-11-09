import React, { useState } from "react";
import "./SpeciesForm.css";

const SpeciesForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredStatus, setEnteredStatus] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setEnteredStatus(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const speciesData = {
      name: enteredName,
      status: enteredStatus,
      date: new Date(enteredDate),
    };

    props.onSaveSpeciesData(speciesData);
    setEnteredName("");
    setEnteredStatus("");
    setEnteredDate("");
  };

  // Validation regexes
  const validateText = (text) => {
    const nameRegex = /^[a-zA-Z ]{5,30}$/; // Letters only, min 2, max 30
    return nameRegex.test(text);
  }

  const validate = () => {
    const text = document.getElementById("my-input").value;
    const div = document.getElementById("my-div");

    if (text.length === 0) {
      div.innerHTML = "";
    }
    else if (validateText(text) == false) {
      div.innerHTML = enteredName + " requires more characters";
    } else {
      div.innerHTML = enteredName + " is valid!";
    }
  }

  return (
    <form id="my-form">
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Name</label>
          <input 
            id="my-input"
            type="text"
            value={enteredName}
            onChange={nameChangeHandler}
            onKeyUp={validate}
          />
        </div>
        <div id="my-div"></div>
        <div className="new-expense__control">
          <label>Status</label>
          <input
            type="text"
            value={enteredStatus}
            onChange={statusChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={enteredDate}
            min="2021-01-01"
            onChange={dateChangeHandler}
          />
        </div>
        <div className="new-expense__actions">
          <button type="submit" onClick={submitHandler}>
            Add Species
          </button>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default SpeciesForm;