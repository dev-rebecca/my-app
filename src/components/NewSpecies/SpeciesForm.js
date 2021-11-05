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

    props.onSaveSpeciesData();
    setEnteredName('');
    setEnteredStatus('');
    setEnteredDate('');
  };

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Name</label>
          <input type="text" value={enteredName} onChange={nameChangeHandler} />
        </div>
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
          <button type="submit" onClick={submitHandler}>Add Species</button>
        </div>
      </div>
    </form>
  );
};

export default SpeciesForm;
