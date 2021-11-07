import React, { useState } from "react";
import SpeciesForm from "./SpeciesForm";
import "./NewSpecies.css";

const NewSpecies = (props) => {
  const [isEditting, setisEditting] = useState(false);

  const saveSpeciesDataHandler = (enteredSpeciesData) => {
    const speciesData = {
      ...enteredSpeciesData,
      id: Math.random().toString(),
    };
    props.onAddSpecies(speciesData);
    setisEditting(false);
  };

  const startEdittingHandler = () => {
    setisEditting(true);
  };

  const stopEdittingHandler = () => {
    setisEditting(false);
  };

  return (
    <div className="new-expense">
      {!isEditting && (
        <button onClick={startEdittingHandler}>Add New Species</button>
      )}
      {isEditting && (
        <SpeciesForm
          onSaveSpeciesData={saveSpeciesDataHandler}
          onCancel={stopEdittingHandler}
        />
      )}
    </div>
  );
};

export default NewSpecies;
