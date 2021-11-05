import React, { useState } from 'react';

import SpeciesDate from "./SpeciesDate";
import Card from "../UI/Card";
import "./IndividualSpecies.css";

const IndividualSpecies = props => {

  const [name, setName] = useState(props.name);

  const clickHandler = () => {
    setName('Updated');
  }

  return (
    <Card className="expense-item">
      <SpeciesDate date={props.date}/>
      <div className="expense-item__description">
        <h2>{name}</h2>
        <div className="expense-item__price">{props.status}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}

export default IndividualSpecies;