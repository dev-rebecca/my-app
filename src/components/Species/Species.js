import IndividualSpecies from "./IndividualSpecies";
import Card from "../UI/Card";
import "./Species.css";

const Species = props => {

  return (
    <Card className="expenses">
      <IndividualSpecies
        name={props.animals[0].name}
        status={props.animals[0].status}
        date={props.animals[0].date}
      />
      <IndividualSpecies
        name={props.animals[1].name}
        status={props.animals[1].status}
        date={props.animals[1].date}
      />
      <IndividualSpecies
        name={props.animals[2].name}
        status={props.animals[2].status}
        date={props.animals[2].date}
      />
      <IndividualSpecies
        name={props.animals[3].name}
        status={props.animals[3].status}
        date={props.animals[3].date}
      />
    </Card>
  );
}

export default Species;
