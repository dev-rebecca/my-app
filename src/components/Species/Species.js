import IndividualSpecies from "./IndividualSpecies";
import Card from "../UI/Card";
import "./Species.css";

const Species = (props) => {
  return (
    <Card className="expenses">
      {props.animals.map((animal) => (
        <IndividualSpecies
          name={animal.name}
          status={animal.status}
          date={animal.date}
        />
      ))}
    </Card>
  );
};

export default Species;
