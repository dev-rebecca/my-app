import React from 'react';

import SpeciesDate from "./SpeciesDate";
import Card from "../UI/Card";
import "./IndividualSpecies.css";

const IndividualSpecies = props => {

  return (
    <Card className="expense-item">
      <SpeciesDate date={props.date}/>
      <div className="expense-item__description">
        <h2>{props.name}</h2>
        <div className="expense-item__price">{props.status}</div>
      </div>
    </Card>
  );
}

export default IndividualSpecies;